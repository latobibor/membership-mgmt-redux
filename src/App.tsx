import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { AccessManagerContainer } from './components/access-manager-layout/access-manager-container';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App container">
        <Header />
        <AccessManagerContainer />
      </div>
    </Provider>
  );
}

export default App;
