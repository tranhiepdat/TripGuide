import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = new URL(`${import.meta.env.BASE_URL}sw.js`, window.location.href);
    navigator.serviceWorker.register(serviceWorkerUrl, { scope: import.meta.env.BASE_URL }).catch((error: unknown) => {
      console.warn('Không thể đăng ký chế độ ngoại tuyến:', error);
    });
  });
}
