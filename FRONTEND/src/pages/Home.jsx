import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { connect } from "react-redux";

class Home extends React.Component {
  state = {
    drugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
  };

  fetchProducts = () => {
    Axios.get("http://localhost:3300/obat/get")
      .then((result) => {
        this.setState({
          drugList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.drugList];
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <div>
        {/* KATEGORI DAN CAROUSEL START */}
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
        {/* KATEGORI & CAROUSEL STOP / DAFTAR OBAT MULAI */}
        <div className="container-fluid pt-5 bg-light">
          <div className="text-center mb-4">
            <h2 className="section-title px-5">
              <span className="px-2">DAFTAR OBAT</span>
            </h2>
          </div>
          <div class="row px-xl-5 pb-3">
            {/* Drugs Product Card */}
            {this.renderProducts()}
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <button
                disabled={this.state.page === 1}
                onClick={this.prevPageHandler}
                className="btn btn-info"
              >
                {"<"}
              </button>
              <div className="text-center px-5">
                Page {this.state.page} of {this.state.maxPage}{" "}
              </div>
              <button onClick={this.nextPageHandler} className="btn btn-info">
                {">"}
              </button>
            </div>
          </div>
        </div>
        {/* KIRIM RESEP START */}
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">KIRIM RESEP</h1>
            <p>
              AMR Pharmacy memberikan kemudahan bagi Anda untuk tebus obat resep
              tanpa antre secara online dengan adanya layanan upload resep
              dokter. Tidak perlu antri menebus resep di Rumah Sakit, Klinik,
              atau Apotek, sekarang Anda bisa langsung upload resep dokter di
              website AMR Pharmacy. Caranya mudah, dengan foto langsung resep
              obat menggunakan smartphone dan upload pada menu kirim resep yang
              tersedia di AMR Pharmacy.
            </p>
            <a className="btn btn-outline-secondary" href="/prescription-page">
              Kirim Resep
            </a>
          </div>
        </div>
        {/* KIRIM RESEP END */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Home);
