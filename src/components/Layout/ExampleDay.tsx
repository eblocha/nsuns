import React from 'react'
import { LiftTypes } from '../../api'
import Day from '../Day/Day'

const ExampleDay = () => {
  return (
    <Day
      title="Monday"
      lifts={[
        {
          id: '0',
          type: LiftTypes.CUSTOM,
          name: 'Bench',
          sets: [
            { weight: 180, reps: 5, id: '0' },
            { weight: 180, reps: 5, id: '1' },
          ],
        },
        {
          id: '1',
          type: LiftTypes.CUSTOM,
          name: 'My Custom Lift',
          description: 'This is a description of the exercise',
          sets: [
            {
              weight: 180,
              reps: 3,
              description: 'This is a long description for the set',
              id: '0',
            },
          ],
        },
      ]}
      active={true}
      onClick={() => {}}
    />
  )
}

export default ExampleDay
