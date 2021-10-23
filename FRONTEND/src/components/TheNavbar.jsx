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
        <div className="d-flex flex-wrap align-items-center justify-content-between py-2 mx-5">
          <a
            href="/"
            className="col-2 d-flex mb-md-0 text-white text-decoration-none text-start"
          >
            <h3>
              <span>
                <i className="fas fa-tablets"></i>
              </span>
              AMR{" "}
            </h3>
          </a>
          <form className="nav col-8 form-group justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Temukan obat..."
              style={{ width: "500px" }}
            />
          </form>
          <div className="text-end col-2">
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

                  {this.props.userGlobal.role === "USER" ? (
                    <DropdownItem>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                        to="/prescription-page"
                      >
                        KIRIM RESEP
                      </Link>
                    </DropdownItem>
                  ) : (
                    <DropdownItem>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                        to="/admin"
                      >
                        ADMIN
                      </Link>
                    </DropdownItem>
                  )}
                  <DropdownItem>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="text-dark"
                      to="/change-password"
                    >
                      CHANGE PASSWORD
                    </Link>
                  </DropdownItem>
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
                className="btn btn-outline-success"
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
