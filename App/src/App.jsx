import { useState } from 'react'

import Pathfinding from './Pathfinding'

import { ColorsProvider } from './contexts/ColorsContext'
import { SpeedsProvider } from './contexts/SpeedsContext'
import { ControlsProvider } from './contexts/ControlsContext'
import { TasksProvider } from './contexts/TasksContext'

function App() {
  return (
    <ColorsProvider>
      <ControlsProvider>
        <SpeedsProvider>
          <TasksProvider>
            <Pathfinding/>
          </TasksProvider>
        </SpeedsProvider>
      </ControlsProvider>
    </ColorsProvider>
  )
}

export default App