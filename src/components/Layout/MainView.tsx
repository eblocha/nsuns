import React from 'react'
import StatList from '../Stat/StatList'
import ExampleDay from './ExampleDay'

const MainView = () => {
  return (
    <div className="w-full h-full overflow-hidden grid grid-cols-3 gap-2 p-5">
      <div className="flex flex-row items-center">
        <div className="pr-3">
          <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        </div>
        <ExampleDay />
        <div className="pl-3">
          <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        </div>
      </div>
      <StatList
        title="Maxes"
        stats={[
          {
            title: 'Bench',
            value: 195,
            history: [155, 165, 170, 180, 190, 195],
          },
          {
            title: 'Squat',
            value: 210,
          },
          {
            title: 'Deadlift',
            value: 320,
          },
          {
            title: 'Press',
            value: 130,
          },
        ]}
      />
      <StatList
        title="Reps"
        stats={[
          {
            title: 'Bench',
            value: 2,
          },
          {
            title: 'Squat',
            value: 2,
          },
          {
            title: 'Deadlift',
            value: 2,
          },
          {
            title: 'Press',
            value: 2,
          },
        ]}
      />
    </div>
  )
}

export default MainView
