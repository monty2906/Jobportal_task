import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Routers from './Routers';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reducers from './components/store/reducer';
// import thunk from 'redux-thunk';

// const store = createStore(reducers, {}, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <Routers />
      // </Provider>
    );
  }
}
export default App;