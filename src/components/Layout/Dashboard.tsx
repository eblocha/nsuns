import React from 'react';
import VoiceButton from '../Voice/VoiceButton';
import MainView from './MainView';
import TopInfo from './TopInfo';

const Dashboard = () => {
  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      <div className="shrink-0 overflow-hidden flex flex-row p-5 items-start">
        <TopInfo />
        <VoiceButton />
      </div>
      <div className="grow overflow-hidden">
        <MainView />
      </div>
    </div>
  );
};

export default Dashboard;
