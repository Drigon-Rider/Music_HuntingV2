import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AudioProvider } from './Components/SearchPage/Audio/AudioContext.tsx'
import { QueueProvider } from './Components/Queue/QueueContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      <QueueProvider>
        <App />
      </QueueProvider>
    </AudioProvider>
  </StrictMode>,
)
