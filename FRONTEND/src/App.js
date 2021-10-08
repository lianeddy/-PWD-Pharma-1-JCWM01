import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/forgot";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import ProductDetail from "./pages/ProductDetail";
import TheNavbar from "./components/TheNavbar";
import Footer from "./components/Footer";
import PrescriptionPage from "./pages/PrescriptionPage";
import ProfilePage from "./pages/ProfilePage";
import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import changePassword from "./pages/changePassword";
import Verification from "./pages/Auth/Verification";
import EditProfile from "./pages/EditProfile";
import AdminUploadProduct from "./pages/Admin/AdminUploadProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataAMR");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <TheNavbar />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Admin} path="/admin" />
          <Route component={Verification} path="/verification/:token" />
          <Route component={Forgot} path="/forgot" />
          <Route component={AdminUploadProduct} path="/admin-upload-product" />
          <Route component={AdminEditProduct} path="/admin-edit-product/:id" />
          <Route component={changePassword} path="/change-password" />
          <Route component={ProfilePage} path="/profile-page/:username" />
          <Route component={EditProfile} path="/edit-profile/:username" />
          <Route component={Cart} path="/cart" />
          <Route component={History} path="/history" />
          <Route component={ProductDetail} path="/product-detail/:obatid" />
          <Route component={PrescriptionPage} path="/prescription-page" />
          <Route component={Home} path="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
