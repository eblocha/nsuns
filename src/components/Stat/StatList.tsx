import React from 'react';
import { DataWithHistory } from '../../api';
import { Graph } from './Graph';
import Stat from './Stat';

type IProps = {
  title: string;
  stats: DataWithHistory[];
  onEdit?: (id: string, value: string) => boolean;
};

const empty: number[] = [];

const StatList = (props: IProps) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="text-2xl font-semibold mb-1">{props.title}</div>
      <div className="flex flex-col overflow-y-auto grow">
        {props.stats.map((stat) => (
          <div className="flex flex-row py-2" key={stat.id}>
            <Stat {...stat} onEdit={props.onEdit} />
            <Graph data={stat.history || empty} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatList;
