import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
