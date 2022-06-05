import React from 'react';
import { MessageList } from '../Notifications/MessageList';
import VoiceButton from '../Voice/VoiceButton';
import MainView from './MainView';
import TopInfo from './TopInfo';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="shrink-0 overflow-hidden flex flex-row p-5 items-start">
        <TopInfo />
        <VoiceButton />
      </div>
      <div className="grow overflow-hidden">
        <MainView />
      </div>
      <MessageList />
    </div>
  );
};

export default Dashboard;
