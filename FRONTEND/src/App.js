import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import resetPassword from "./pages/Auth/resetPassword";
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
import EditProfilePicture from "./pages/EditProfilePicture";
import AdminUploadProduct from "./pages/Admin/AdminUploadProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import { getCartData } from "./redux/actions/cart";
import RequestDetail from "./pages/Admin/RequestDetail";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataAMR");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id_user);
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
          <Route component={resetPassword} path="/reset-password" />

          <Route component={AdminUploadProduct} path="/admin-upload-product" />
          <Route component={AdminEditProduct} path="/admin-edit-product/:id" />
          <Route component={changePassword} path="/change-password" />
          <Route component={ProfilePage} path="/profile-page/:id" />
          <Route
            component={EditProfilePicture}
            path="/edit-profile-picture/:id"
          />
          <Route component={Cart} path="/cart" />
          <Route component={History} path="/history" />
          <Route component={ProductDetail} path="/product-detail/:obatid" />
          <Route component={PrescriptionPage} path="/prescription-page" />
          <Route component={RequestDetail} path="/request-detail/:id" />
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
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
