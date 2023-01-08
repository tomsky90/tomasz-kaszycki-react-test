import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams, Navigate} from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
//components
import Header from './components/header/Header';
import ProductPage from './pages/ProductPage';
//pages
import CategoryPage from './pages/Category';
import CartPage from './pages/CartPage';
//style
import './styles/appStyles.scss';


class App extends Component {

  render(){
    const Wrapper = (props) => {
      const params = useParams();
      return <CategoryPage {...{...props, match: {params}}}/>
    }

    const ProductPageWrapper = (props) => {
      const params = useParams();
      return <ProductPage {...{...props, match: {params}}}/>
    }
    return(
      <Provider store={store}>
      <BrowserRouter>
      <div className='app-wrapper'>
        <div className='message'>
        </div>
        <Header/>
        <Routes>
          <Route path='/:name' element={<Wrapper/>}/>
          <Route path='/' element={<Navigate replace to='/all'/>}/>
          <Route path=':category/:id' element={<ProductPageWrapper/>}/>
          <Route path='cart' element={<CartPage/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
