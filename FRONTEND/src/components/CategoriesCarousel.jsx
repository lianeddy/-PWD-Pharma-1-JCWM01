import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CategoriesCarousel extends React.Component {
  alertHandler = () => {
    alert("Daftar atau Login untuk membeli obat atau mengirim resep");
  };

  render() {
    return (
      <div className="container-fluid mb-3 bg-light">
        <div className="row">
          <div className="col-lg-8">
            <div
              style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div style={{ height: "416px", position: "relative" }}>
                <img
                  className="position-absolute w-100 h-100 img-fluid"
                  src="https://i.pinimg.com/originals/04/94/6c/04946cf7a010c553c9e9636cfad54970.jpg"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    zIndex: "10",
                    paddingTop: "20px",
                    color: "#fff",
                    textAlign: "start",
                  }}
                  className="
                    
                    d-flex
                    flex-column
                    align-items-start
                    justify-content-start
                  "
                >
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1
                      className="
                        display-4
                        text-light
                        mb-3
                        
                        
                      "
                    >
                      Selamat Datang
                    </h1>
                    <p className="text-light">
                      Temukan obat yang anda butuhkan atau tebus resep dokter di
                      website ini.
                    </p>
                    <a
                      className="
                        btn btn-light
                        py-2
                        px-4
                        mt-3
                        text-dark
                      "
                      href="/product-list"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="mb-3"
              style={{
                height: "200px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src="https://c1.wallpaperflare.com/preview/127/900/926/about-drug-medical-treatment.jpg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <h3 className="text-dark mb-3">Kirim Resep Dokter</h3>
                {this.props.userGlobal.id_user ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                    to="/prescription-page"
                  >
                    <button className="btn btn-info">
                      <h6 className="text-center">Kirim Resep</h6>
                    </button>
                  </Link>
                ) : (
                  <a
                    onClick={this.alertHandler}
                    href=""
                    className="btn btn-info"
                  >
                    <h6 className="text-center">Kirim Resep</h6>
                  </a>
                )}
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                height: "200px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src="https://images.unsplash.com/photo-1585912812840-b457972f28d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "start",
                  zIndex: "1",
                  zIndex: 1,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <h6 className="text-white text-uppercase">Paket Covid-19</h6>
                <h3 className="text-white mb-3">Diskon 20%</h3>
                {this.props.userGlobal.id_user ? (
                  <a href="/product-list" className="btn btn-info">
                    Shop Now
                  </a>
                ) : (
                  <a className="btn btn-info disabled">Shop Now</a>
                )}
              </div>
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
