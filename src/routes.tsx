import React from "react"
import { HashRouter, Route } from "react-router-dom"

import Home from "./pages/Home"

export const Routes = () => (
  <HashRouter>
    <Route path="/" exact component={Home} />
  </HashRouter>
)