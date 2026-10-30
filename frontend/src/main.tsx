import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PayProofProvider } from './context/PayProofStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PayProofProvider>
      <App />
    </PayProofProvider>
  </StrictMode>,
);
