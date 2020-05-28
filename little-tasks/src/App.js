import React from 'react';
import './App.css';
import Header from '../src/layout/Header/Header';
import Footer from '../src/layout/Footer/Footer'
import Home from './Containers/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
