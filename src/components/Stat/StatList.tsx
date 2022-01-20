import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import Stat, { StatData } from './Stat'

type DataWithHistory = StatData & {
  history?: number[]
}

type IProps = {
  title: string
  stats: DataWithHistory[]
}

const StatList = (props: IProps) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="text-2xl font-semibold mb-1">{props.title}</div>
      <div className="flex flex-col overflow-y-auto flex-grow">
        {props.stats.map((stat, index) => (
          <div className="flex flex-row py-2" key={index}>
            <Stat {...stat} />
            <div className="flex-grow px-2">
              <Sparklines data={stat.history || []}>
                <SparklinesLine
                  color="rgb(29, 78, 216)"
                  style={{ strokeWidth: 3, fill: 'none' }}
                />
              </Sparklines>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatList
