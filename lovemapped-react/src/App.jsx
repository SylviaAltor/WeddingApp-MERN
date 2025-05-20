import React from 'react';
import AppRouter from './routes/AppRouter.jsx';

// App component rendering the AppRouter for routing between pages
function App() {
  return (
    <div className="App">
      <AppRouter />  {/* Render the AppRouter for routing between pages */}
    </div>
  );
}

export default App;
