import { useState } from 'react'

import Pathfinding from './Pathfinding'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pathfinding/>
    </>
  )
}

export default App