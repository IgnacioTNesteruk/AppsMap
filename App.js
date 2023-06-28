import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import MainNavigator from './navigation'

import { init } from './db';

init()
  .then(() => console.log("Base de datos iniciada"))
  .catch(err => {
    console.log("Base de datos no creada ")
    console.log(err.message)
  })

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
