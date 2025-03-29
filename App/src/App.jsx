import { useState } from 'react'

import Pathfinding from './Pathfinding'

import { ColorsProvider } from './contexts/ColorsContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ColorsProvider>
      <Pathfinding/>
    </ColorsProvider>
  )
}

export default App