import React from 'react'
import Home from "./components/Home"
import store from "./store/index"
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const App = () => {

  let persistor = persistStore(store);
//restart the persistor
// persistor.purge().then(() => {
//   //Persisted state has been cleared
// });


  return (

    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Home />
          <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App