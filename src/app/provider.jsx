"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import { persistStore} from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'

export default function provider({children}) {

  // let persistor = persistStore(store)
  return (
    <Provider store={store}>
   
      {children}
      
    </Provider>
  )
}