import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api';
import Dashboard from './components/Layout/Dashboard';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
