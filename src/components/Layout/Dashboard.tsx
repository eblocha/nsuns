import React from 'react';
import MainView from './MainView';
import TopInfo from './TopInfo';

const Dashboard = () => {
  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      <div className="shrink-0 overflow-hidden flex flex-row p-5 items-start">
        <TopInfo />
        <div className="shrink-0 h-32 w-32">
          <div className="h-full rounded-full w-full bg-blue-500"></div>
        </div>
      </div>
      <div className="grow overflow-hidden">
        <MainView />
      </div>
    </div>
  );
};

export default Dashboard;
