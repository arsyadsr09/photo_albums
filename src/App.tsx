import React from "react"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { Routes } from "./routes"
import { store, persistor } from "./store"

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
)
