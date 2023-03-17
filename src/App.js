import React, { Component } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
//components
import Header from './components/header/Header';
import ProductPage from './pages/ProductPage';
import Message from './components/message/Message';
//pages
import CategoryPage from './pages/Category';
import CartPage from './pages/CartPage';
//style
import './styles/appStyles.scss';


class App extends Component {

  render(){

    return(
      <Provider store={store}>
      <div className='app-wrapper'>
        <Message/>
        <Header/>
        <Routes>
          <Route path='/:name' element={<CategoryPage/>}/>
          <Route path='/' element={<Navigate replace to='/all'/>}/>
          <Route path=':category/:id' element={<ProductPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </div>
      </Provider>
    )
  }
}

export default App;
