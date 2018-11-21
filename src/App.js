import React, { Component } from 'react';
import UndeadDarts from './components/UndeadDarts';

import './App.css';

class App extends Component {

  state = {
    user: null
  }

  render() {
    return (
      <div className="App">
        <UndeadDarts />
      </div>
    );
  }
}

export default App;
