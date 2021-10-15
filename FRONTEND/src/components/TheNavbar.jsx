import React from "react";
import { Link } from "react-router-dom";
import {
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
        <div className="container d-flex flex-wrap align-items-center justify-content-md-between py-2">
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
          <form className="nav">
            <div class="mx-sm-1 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Temukan obat..."
                aria-label="Search"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="col-md-3 text-end">
            {this.props.userGlobal.id_user ? (
              <UncontrolledDropdown>
                <DropdownToggle
                  className="text-uppercase btn btn-success"
                  caret
                >
                  Hello, {this.props.userGlobal.nama_depan}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="text-dark"
                      to={`/profile-page/${this.props.userGlobal.email}`}
                    >
                      PROFIL ANDA
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
                      KERANJANG ({this.props.cartGlobal.cartList.length})
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
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToPtops = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToPtops)(TheNavbar);
