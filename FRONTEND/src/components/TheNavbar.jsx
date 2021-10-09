import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";

class TheNavbar extends React.Component {


  
  render() {
    return (
      <header className="sticky-top bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
            <a
              href="/"
              className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none"
            >
              <h3>
                <span>
                  <i className="fas fa-tablets"></i>
                </span>
                AMR{" "}
              </h3>
            </a>
            
            <div className="col-md-3 text-end">
              {this.props.userGlobal.username ?  (
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="text-uppercase btn btn-success"
                    caret
                  >
                    {this.props.userGlobal.username}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                        to="/profile-page"
                      >
                        EDIT PROFIL
                      </Link>
                    </DropdownItem>
                    {this.props.userGlobal.role === "ADMIN" ? (
                      <DropdownItem>
                        <Link
                          style={{ textDecoration: "none" }}
                          className="text-dark"
                          to="/admin"
                        >
                          ADMIN
                        </Link>
                      </DropdownItem>
                    ) : null}
                    <DropdownItem>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                        to="/cart"
                      >
                        KERANJANG
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                        to="/change-password"
                      >
                        Change Password
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logoutUser}>
                      LOG OUT
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <button
                  type="button"
                  href="/"
                  className="btn btn-outline-success me-2 "
                >
                  <Link to="/login" className="text-light text-decoration-none">
                    Login / Register
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToPtops = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToPtops)(TheNavbar);
