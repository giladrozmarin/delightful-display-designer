
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force a clean render of the application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found! Check your HTML structure.");
}
