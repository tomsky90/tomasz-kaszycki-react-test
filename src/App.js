import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//components
import Header from './components/header/Header';
//style
import './styles/appStyles.scss'

class App extends Component {
  render(){
    return(
      <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
