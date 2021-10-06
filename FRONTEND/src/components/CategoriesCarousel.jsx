import React from "react";
import { connect } from "react-redux";

class CategoriesCarousel extends React.Component {
  render() {
    return (
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-success text-white w-100"
              style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-auto">KATEGORI</h6>
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <ul
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: "410px", marginLeft: "8px" }}
              >
                <a href="" className="nav-item nav-link border-bottom">
                  OBAT BEBAS
                </a>
                <a href="" className="nav-item nav-link border-bottom">
                  OBAT BEBAS TERBATAS
                </a>
                <a href="" className="nav-item nav-link border-bottom">
                  OBAT KERAS
                </a>
              </ul>
            </nav>
          </div>
          <div className="col-lg-9">
            {this.props.userGlobal.username ? (
              <>
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                  <div
                    className="collapse navbar-collapse justify-content-between"
                    id="navbarCollapse"
                  >
                    <div className="navbar-nav mr-auto py-0">
                      <a
                        href="/prescription-page"
                        className="nav-item nav-link active"
                      >
                        KIRIM RESEP<i className="fa fa-upload"></i>
                      </a>
                    </div>
                    <div className="navbar-nav ml-auto py-0">
                      {this.props.userGlobal.role === "ADMIN" ? (
                        <a href="/admin" className="nav-item nav-link">
                          ADMIN <i className="fa fa-user-lock"></i>
                        </a>
                      ) : null}
                      <a href="/cart" className="nav-item nav-link">
                        CART <i className="fa fa-shopping-cart"></i>
                        <span>0</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </>
            ) : (
              <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                <div
                  className="collapse navbar-collapse justify-content-between"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-auto py-0">
                    <a
                      href="/prescription-page"
                      className="nav-item nav-link active"
                    >
                      KIRIM RESEP<i className="fa fa-upload"></i>
                    </a>
                  </div>
                  <div className="navbar-nav ml-auto py-0">
                    <a href="/login" className="nav-item nav-link">
                      Masuk / Daftar <i className="fa fa-sign-in-alt"></i>
                    </a>
                  </div>
                </div>
              </nav>
            )}
            <div
              id="header-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  style={{ height: "410px" }}
                >
                  <img
                    className="d-block w-100"
                    src="https://www.afd.fr/sites/afd/files/styles/visuel_principal/public/2019-10-09-27-46/flickr-marco-verch.jpg?itok=XH4x7-Y4"
                    alt="Image"
                  />
                </div>
                <div className="carousel-item" style={{ height: "410px" }}>
                  <img
                    className="img-fluid"
                    src="img/carousel-2.jpg"
                    alt="Image"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#header-carousel"
                data-slide="prev"
              >
                <div
                  className="btn btn-dark"
                  style={{ width: "45px", height: "45px" }}
                >
                  <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
              </a>
              <a
                className="carousel-control-next"
                href="#header-carousel"
                data-slide="next"
              >
                <div
                  className="btn btn-dark"
                  style={{ width: "45px", height: "45px" }}
                >
                  <span className="carousel-control-next-icon mb-n2"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(CategoriesCarousel);
