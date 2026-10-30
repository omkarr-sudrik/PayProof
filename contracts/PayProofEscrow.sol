// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PayProofEscrow
 * @dev Ultra-secure, trust-first escrow smart contract for PayProof on MST Blockchain.
 * Built for student micro-gigs with automated milestone protection, 5-day review timer,
 * 2.5% platform fee calculation, 2-of-3 referee arbitration, and Proof-of-Work badges.
 */
contract PayProofEscrow {
    enum State {
        Funded,
        InProgress,
        Submitted,
        RevisionRequested,
        Disputed,
        Released,
        Refunded
    }

    struct Job {
        uint256 id;
        address client;
        address freelancer;
        uint256 amount;
        uint256 deadline;
        uint256 reviewWindow;
        uint256 reviewDeadline;
        uint256 acceptedAt;
        uint8 maxRevisions;
        uint8 revisionsUsed;
        State state;
        bytes32 fileHash;
        string deliverableUri;
        string title;
        uint8 rating;
    }

    address public owner;
    bool public paused;
    uint256 public jobCounter;
    uint256 public totalVaultLocked;
    uint256 public totalReleased;

    uint256 private _unlocked = 1;

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => uint8) public votesForFreelancer;
    mapping(uint256 => uint8) public votesForClient;
    mapping(address => bool) public isReferee;
    mapping(address => uint256) public badgeCount;

    event JobFunded(
        uint256 indexed jobId,
        address indexed client,
        address indexed freelancer,
        uint256 amount,
        string title
    );
    event JobAccepted(uint256 indexed jobId, address indexed freelancer);
    event DeliverableSubmitted(
        uint256 indexed jobId,
        bytes32 fileHash,
        string deliverableUri,
        uint256 reviewDeadline
    );
    event WorkApprovedAndPaid(
        uint256 indexed jobId,
        uint256 payout,
        uint256 fee,
        uint8 rating
    );
    event RevisionRequested(uint256 indexed jobId, string reason, uint8 revisionsUsed);
    event AutoReleasedOnSilence(uint256 indexed jobId, uint256 payout, uint256 fee);
    event RefundClaimed(uint256 indexed jobId, uint256 amount);
    event DisputeRaised(uint256 indexed jobId, address indexed initiator, string evidence);
    event DisputeVoted(uint256 indexed jobId, address indexed referee, bool favorFreelancer);
    event DisputeResolved(
        uint256 indexed jobId,
        State finalState,
        uint8 votesForFreelancer,
        uint8 votesForClient
    );
    event ProofBadgeMinted(
        uint256 indexed jobId,
        address indexed freelancer,
        string title
    );

    modifier nonReentrant() {
        require(_unlocked == 1, "REENTRANCY_GUARD");
        _unlocked = 0;
        _;
        _unlocked = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "CONTRACT_PAUSED");
        _;
    }

    modifier onlyClient(uint256 _jobId) {
        require(jobs[_jobId].client == msg.sender, "ONLY_CLIENT");
        _;
    }

    modifier onlyFreelancer(uint256 _jobId) {
        require(jobs[_jobId].freelancer == msg.sender, "ONLY_FREELANCER");
        _;
    }

    modifier onlyReferee() {
        require(isReferee[msg.sender] || msg.sender == owner, "ONLY_REFEREE");
        _;
    }

    constructor() {
        owner = msg.sender;
        isReferee[msg.sender] = true;
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    function addReferee(address _referee) external onlyOwner {
        require(_referee != address(0), "INVALID_REFEREE");
        isReferee[_referee] = true;
    }

    function removeReferee(address _referee) external onlyOwner {
        isReferee[_referee] = false;
    }

    /**
     * @notice Step 1: Client locks money into escrow for student freelancer
     */
    function createAndFundJob(
        address _freelancer,
        uint256 _deadline,
        uint256 _reviewWindow,
        uint8 _maxRevisions,
        string calldata _title
    ) external payable nonReentrant whenNotPaused returns (uint256) {
        require(msg.value > 0, "ZERO_AMOUNT");
        require(_freelancer != address(0), "ZERO_FREELANCER_ADDR");
        require(_freelancer != msg.sender, "CANNOT_HIRE_SELF");

        jobCounter++;
        uint256 currentId = jobCounter;

        jobs[currentId] = Job({
            id: currentId,
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            deadline: _deadline,
            reviewWindow: _reviewWindow > 0 ? _reviewWindow : 5 days,
            reviewDeadline: 0,
            acceptedAt: 0,
            maxRevisions: _maxRevisions > 0 ? _maxRevisions : 2,
            revisionsUsed: 0,
            state: State.Funded,
            fileHash: bytes32(0),
            deliverableUri: "",
            title: _title,
            rating: 0
        });

        totalVaultLocked += msg.value;

        emit JobFunded(currentId, msg.sender, _freelancer, msg.value, _title);
        return currentId;
    }

    /**
     * @notice Step 2: Freelancer accepts the funded job
     */
    function acceptJob(uint256 _jobId) external onlyFreelancer(_jobId) {
        Job storage job = jobs[_jobId];
        require(job.state == State.Funded, "INVALID_STATE");

        job.state = State.InProgress;
        job.acceptedAt = block.timestamp;

        emit JobAccepted(_jobId, msg.sender);
    }

    /**
     * @notice Step 3: Freelancer submits work proof (SHA-256 hash + deliverable URI)
     */
    function submitDeliverable(
        uint256 _jobId,
        bytes32 _fileHash,
        string calldata _uri
    ) external onlyFreelancer(_jobId) {
        Job storage job = jobs[_jobId];
        require(
            job.state == State.InProgress || job.state == State.RevisionRequested,
            "INVALID_STATE"
        );
        require(_fileHash != bytes32(0), "EMPTY_FILE_HASH");

        job.state = State.Submitted;
        job.fileHash = _fileHash;
        job.deliverableUri = _uri;
        job.reviewDeadline = block.timestamp + job.reviewWindow;

        emit DeliverableSubmitted(_jobId, _fileHash, _uri, job.reviewDeadline);
    }

    /**
     * @notice Step 4A: Client approves deliverable -> 97.5% paid to freelancer, 2.5% fee to owner
     */
    function approveWork(uint256 _jobId, uint8 _rating)
        external
        nonReentrant
        onlyClient(_jobId)
    {
        Job storage job = jobs[_jobId];
        require(job.state == State.Submitted, "NOT_SUBMITTED");

        // Checks-Effects-Interactions (CEI)
        job.state = State.Released;
        job.rating = _rating > 0 ? _rating : 5;
        uint256 totalAmount = job.amount;
        totalVaultLocked -= totalAmount;
        totalReleased += totalAmount;
        badgeCount[job.freelancer]++;

        uint256 fee = (totalAmount * 25) / 1000; // 2.5% platform fee
        uint256 payout = totalAmount - fee;       // 97.5% net payout

        emit WorkApprovedAndPaid(_jobId, payout, fee, job.rating);
        emit ProofBadgeMinted(_jobId, job.freelancer, job.title);

        (bool successFreelancer, ) = payable(job.freelancer).call{value: payout}("");
        require(successFreelancer, "PAYOUT_TRANSFER_FAILED");

        if (fee > 0) {
            (bool successFee, ) = payable(owner).call{value: fee}("");
            require(successFee, "FEE_TRANSFER_FAILED");
        }
    }

    /**
     * @notice Step 4B: Client requests revision within agreed limit
     */
    function requestRevision(uint256 _jobId, string calldata _reason)
        external
        onlyClient(_jobId)
    {
        Job storage job = jobs[_jobId];
        require(job.state == State.Submitted, "NOT_SUBMITTED");
        require(job.revisionsUsed < job.maxRevisions, "REVISION_LIMIT_EXCEEDED");

        job.revisionsUsed++;
        job.state = State.RevisionRequested;

        emit RevisionRequested(_jobId, _reason, job.revisionsUsed);
    }

    /**
     * @notice Scenario B: Client goes silent -> anyone can trigger auto-release after reviewDeadline
     */
    function autoRelease(uint256 _jobId) external nonReentrant {
        Job storage job = jobs[_jobId];
        require(job.state == State.Submitted, "NOT_SUBMITTED");
        require(block.timestamp >= job.reviewDeadline, "WINDOW_ACTIVE");

        job.state = State.Released;
        job.rating = 5;
        uint256 totalAmount = job.amount;
        totalVaultLocked -= totalAmount;
        totalReleased += totalAmount;
        badgeCount[job.freelancer]++;

        uint256 fee = (totalAmount * 25) / 1000;
        uint256 payout = totalAmount - fee;

        emit AutoReleasedOnSilence(_jobId, payout, fee);
        emit ProofBadgeMinted(_jobId, job.freelancer, job.title);

        (bool successFreelancer, ) = payable(job.freelancer).call{value: payout}("");
        require(successFreelancer, "PAYOUT_TRANSFER_FAILED");

        if (fee > 0) {
            (bool successFee, ) = payable(owner).call{value: fee}("");
            require(successFee, "FEE_TRANSFER_FAILED");
        }
    }

    /**
     * @notice Scenario C: Freelancer never starts or client cancels before work begins
     */
    function claimRefund(uint256 _jobId) external nonReentrant onlyClient(_jobId) {
        Job storage job = jobs[_jobId];
        require(
            job.state == State.Funded && (job.deadline == 0 || block.timestamp >= job.deadline || job.acceptedAt == 0),
            "CANNOT_REFUND"
        );

        job.state = State.Refunded;
        uint256 refundAmount = job.amount;
        totalVaultLocked -= refundAmount;

        emit RefundClaimed(_jobId, refundAmount);

        (bool successClient, ) = payable(job.client).call{value: refundAmount}("");
        require(successClient, "REFUND_TRANSFER_FAILED");
    }

    /**
     * @notice Step 4C / Scenario D: Raise dispute to 3-referee panel
     */
    function raiseDispute(uint256 _jobId, string calldata _evidence) external {
        Job storage job = jobs[_jobId];
        require(
            msg.sender == job.client || msg.sender == job.freelancer,
            "NOT_JOB_PARTY"
        );
        require(
            job.state == State.Submitted || job.state == State.InProgress,
            "INVALID_DISPUTE_STATE"
        );

        job.state = State.Disputed;
        emit DisputeRaised(_jobId, msg.sender, _evidence);
    }

    /**
     * @notice Scenario D: 2-of-3 Arbitrator voting panel
     */
    function castRefereeVote(uint256 _jobId, bool _favorFreelancer)
        external
        nonReentrant
        onlyReferee
    {
        Job storage job = jobs[_jobId];
        require(job.state == State.Disputed, "NOT_DISPUTED");
        require(!hasVoted[_jobId][msg.sender], "ALREADY_VOTED");

        hasVoted[_jobId][msg.sender] = true;

        if (_favorFreelancer) {
            votesForFreelancer[_jobId]++;
        } else {
            votesForClient[_jobId]++;
        }

        emit DisputeVoted(_jobId, msg.sender, _favorFreelancer);

        // Check for 2-of-3 majority
        if (votesForFreelancer[_jobId] >= 2) {
            job.state = State.Released;
            uint256 totalAmount = job.amount;
            totalVaultLocked -= totalAmount;
            totalReleased += totalAmount;
            badgeCount[job.freelancer]++;

            uint256 fee = (totalAmount * 25) / 1000;
            uint256 payout = totalAmount - fee;

            emit DisputeResolved(
                _jobId,
                State.Released,
                votesForFreelancer[_jobId],
                votesForClient[_jobId]
            );
            emit ProofBadgeMinted(_jobId, job.freelancer, job.title);

            (bool success, ) = payable(job.freelancer).call{value: payout}("");
            require(success, "DISPUTE_PAYOUT_FAILED");

            if (fee > 0) {
                (bool successFee, ) = payable(owner).call{value: fee}("");
                require(successFee, "FEE_TRANSFER_FAILED");
            }
        } else if (votesForClient[_jobId] >= 2) {
            job.state = State.Refunded;
            uint256 refundAmount = job.amount;
            totalVaultLocked -= refundAmount;

            emit DisputeResolved(
                _jobId,
                State.Refunded,
                votesForFreelancer[_jobId],
                votesForClient[_jobId]
            );

            (bool success, ) = payable(job.client).call{value: refundAmount}("");
            require(success, "DISPUTE_REFUND_FAILED");
        }
    }

    /**
     * @notice Frontend helper to instantly sync entire vault statistics
     */
    function getVaultSummary()
        external
        view
        returns (
            uint256 totalLocked,
            uint256 activeJobCount,
            uint256 totalReleasedSum
        )
    {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= jobCounter; i++) {
            State s = jobs[i].state;
            if (
                s == State.Funded ||
                s == State.InProgress ||
                s == State.Submitted ||
                s == State.RevisionRequested ||
                s == State.Disputed
            ) {
                activeCount++;
            }
        }
        return (totalVaultLocked, activeCount, totalReleased);
    }

    function getJob(uint256 _jobId) external view returns (Job memory) {
        return jobs[_jobId];
    }

    receive() external payable {
        revert("DIRECT_DEPOSIT_REJECTED");
    }
}

