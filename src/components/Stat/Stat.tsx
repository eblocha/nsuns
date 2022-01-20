import React from 'react';

export type StatData = {
  title: string;
  value: string | number;
};

const Stat = (props: StatData) => {
  return (
    <div className="flex flex-col bg-gray-800 w-36 flex-shrink-0">
      <div className="flex-shrink-0 bg-gray-700 text-center p-2 text-xl">
        {props.title}
      </div>
      <div className="flex-grow text-center py-3 text-5xl">{props.value}</div>
    </div>
  );
};

export default Stat;
