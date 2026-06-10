import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'

import Pokemones from './assets/Components/pokemones.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Pokemones ></Pokemones>
    
  </StrictMode>
)
