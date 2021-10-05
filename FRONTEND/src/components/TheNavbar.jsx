import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class TheNavbar extends React.Component {
  render() {
    return (
      <div>
        <header className="bg-dark text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
              <a
                href="/"
                className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none"
              >
                <h3>AMR Pharmacy</h3>
              </a>
              <form className="form-inline nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <div class="form-group mx-sm-3 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Temukan obat..."
                    aria-label="Search"
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                  Cari
                </button>
              </form>
              <div className="col-md-3 text-end">
                <button
                  type="button"
                  href="/"
                  className="btn btn-outline-success me-2 "
                >
                  <Link to="/login" className="text-light text-decoration-none">
                    Login / Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(TheNavbar);
