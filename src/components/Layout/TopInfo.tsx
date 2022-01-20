import React from 'react'

const TopInfo = () => {
  return (
    <div className="flex flex-row items-center overflow-hidden w-full h-full p-5 justify-between">
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="overflow-hidden text-7xl mb-4">
          Bench 145 for 3 Reps
        </div>
        <div className="overflow-hidden text-5xl opacity-50">
          Next: Bench 145 for 3 Reps
        </div>
      </div>
      <div className="flex-shrink-0 h-32 w-32">
        <div className="h-full rounded-full w-full bg-blue-500"></div>
      </div>
    </div>
  )
}

export default TopInfo
