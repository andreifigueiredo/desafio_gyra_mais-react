import React, {Suspense} from 'react';
import Routes from './routes/routes';

import './App.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes/>
    </Suspense>
    );
}

export default App;
