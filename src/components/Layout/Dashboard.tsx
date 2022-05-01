import React from 'react';
import MainView from './MainView';
import TopInfo from './TopInfo';

const Dashboard = () => {
  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      <div className="shrink-0 overflow-hidden">
        <TopInfo />
      </div>
      <div className="grow overflow-hidden">
        <MainView />
      </div>
    </div>
  );
};

export default Dashboard;
