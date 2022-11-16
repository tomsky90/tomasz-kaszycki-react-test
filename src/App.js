import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams, Navigate} from 'react-router-dom';
import store from "./store";
import { Provider } from "react-redux";
//components
import Header from './components/header/Header';
//pages
import CategoryPage from './pages/Category';
//style
import './styles/appStyles.scss'


class App extends Component {

  render(){
    const Wrapper = (props) => {
      const params = useParams();
      return <CategoryPage {...{...props, match: {params}}}/>
    }
    return(
      <Provider store={store}>
      <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>

        <Routes>
        
          <Route path='/category/:name' element={<Wrapper/>}/>
          <Route path='/' element={<Navigate replace to='category/all'/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
