import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Albums from "./pages/Albums"
import Favourite from "./pages/Favourite"
import Home from "./pages/Home"
import Users from "./pages/Users"

export const Routes = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/favourite" exact component={Favourite} />
    <Route path="/albums/:id" exact component={Albums} />
    <Route path="/users/:id" exact component={Users} />
  </Router>
)
