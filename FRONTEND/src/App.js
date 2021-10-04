import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import ProductDetail from "./pages/ProductDetail";
import TheNavbar from "./components/TheNavbar";
import Footer from "./components/Footer";
import PrescriptionPage from "./pages/PrescriptionPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <TheNavbar />
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Admin} path="/admin" />
            <Route component={Cart} path="/cart" />
            <Route component={History} path="/history" />
            <Route component={ProductDetail} path="/product-detail" />
            <Route component={PrescriptionPage} path="/prescription-page" />
            <Route component={Home} path="/" />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;