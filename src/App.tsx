import React from 'react';
import Layouts from './Views/Layouts';
import './App.less';

function App(props: any) {
  return (
    <div className="App">
      <Layouts {...props} />
    </div>
  );
}

export default App;
