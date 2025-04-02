import { useState } from 'react'

import Pathfinding from './Pathfinding'

import { ColorsProvider } from './contexts/ColorsContext'
import { SpeedsProvider } from './contexts/SpeedsContext'

function App() {
  return (
    <SpeedsProvider>
      <ColorsProvider>
        <Pathfinding/>
      </ColorsProvider>
    </SpeedsProvider>
  )
}

export default App