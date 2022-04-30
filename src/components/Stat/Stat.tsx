import React from 'react';
import { StatData } from '../../api';

const Stat = (props: StatData) => {
  return (
    <div className="flex flex-col bg-gray-800 w-36 shrink-0">
      <div className="shrink-0 bg-gray-700 text-center p-2 text-xl">
        {props.title}
      </div>
      <div className="grow text-center py-3 text-5xl">{props.value}</div>
    </div>
  );
};

export default Stat;
