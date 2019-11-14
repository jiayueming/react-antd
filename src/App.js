import React from 'react';
import { applyMiddleware, createStore } from 'redux'  //+
import thunk from 'redux-thunk'
import { Provider } from 'react-redux' //+
import { HashRouter as Router } from "react-router-dom";
import { main as mainConfig } from './router/index'
import { RenderRoutes } from './router/utils.js'
// import './App.css';
import reducer from './store/index' //+
const store = createStore(reducer, applyMiddleware(thunk)) // +
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <RenderRoutes routes={mainConfig}></RenderRoutes>
        </div>
      </Router>
    </Provider> 
  )
}

export default App;
