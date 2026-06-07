import React, { useState } from 'react';
import Layout from './layout/Layout';
import HomePage from './pages/home/HomePage';
import Preloader from './components/Preloader';

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      {ready && (
        <Layout>
          <HomePage />
        </Layout>
      )}
    </>
  );
}

export default App;

