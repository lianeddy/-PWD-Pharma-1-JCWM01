import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { connect } from "react-redux";
import CategoriesCarousel from "../components/CategoriesCarousel";
import { API_URL } from "../constants/API";

class Home extends React.Component {
  state = {
    drugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
    searchCategory: "",
    sortBy: "default",
  };

  fetchDrugs = () => {
    if (this.state.searchCategory === "") {
      Axios.get(`${API_URL}/obat/get-drug`)
        .then(
          (result) =>
            this.setState({
              maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
            }),
          Axios.get(`${API_URL}/obat/get-drug`, {
            params: {
              page: (this.state.page - 1) * this.state.itemPerPage,
              item: this.state.itemPerPage,
              sortBy: this.state.sortBy,
            },
          })
            .then((result) => {
              this.setState({
                drugList: result.data,
              });
            })
            .catch((err) => {
              console.log(err);
            })
        )
        .catch((err) => console.log(err));
    } else if (this.state.searchCategory !== "") {
      Axios.get(`${API_URL}/obat/drug-list`, {
        params: {
          golongan: this.state.searchCategory,
        },
      })
        .then(
          (result) =>
            this.setState({
              maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
            }),
          Axios.get(`${API_URL}/obat/drug-list`, {
            params: {
              golongan: this.state.searchCategory,
              sortBy: this.state.sortBy,
              page: (this.state.page - 1) * this.state.itemPerPage,
              item: this.state.itemPerPage,
            },
          })
            .then((result) => {
              this.setState({
                drugList: result.data,
              });
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  };

  renderDrugs = () => {
    return this.state.drugList.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, page: 1 });
  };

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

  componentDidMount() {
    this.fetchDrugs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchCategory !== this.state.searchCategory ||
      prevState.page !== this.state.page ||
      prevState.sortBy !== this.state.sortBy
    ) {
      return this.fetchDrugs();
    }
  }

  render() {
    return (
      <div className="container-style px-5 my-3">
        <CategoriesCarousel />
        <h4 className="display-5 text-uppercase text-center">Penawaran Obat</h4>
        <h6 className="text-start text-uppercase">
          filter <i className="fas fa-filter"></i>
        </h6>
        <div className="d-flex flex-row col-3">
          <select
            onChange={this.inputHandler}
            name="sortBy"
            className="form-control filter-style"
          >
            <option value="default">Default</option>
            <option value="lowPrice">Harga Terendah</option>
            <option value="highPrice">Harga Tertinggi</option>
            <option value="az">Nama Obat A-Z</option>
            <option value="za">Nama Obat Z-A</option>
          </select>
          <select
            onChange={this.inputHandler}
            name="searchCategory"
            className="form-control filter-style"
          >
            <option value="">Semua Obat</option>
            <option value="Obat Bebas">Obat Bebas</option>
            <option value="Obat Bebas Terbatas">Obat Bebas Terbatas</option>
            <option value="Obat Keras">Obat Keras</option>
            <option value="Herbal">Herbal</option>
            <option value="Covid-19">Covid-19</option>
            <option value="Alat Kesehatan">Alat Kesehatan</option>
          </select>
        </div>
        <div>
          <a href="/product-list" style={{ color: "black" }}>
            Lihat semua obat
          </a>
        </div>
        <div className=" row col-12 bg-white mt-3">
          <div className="d-flex flex-direction-row align-items-center justify-content-center"></div>

          {this.state.drugList.length === 0 ? (
            <div className="d-flex align-items-center flex-row justify-content-center mt-5">
              <h4>sorry error page!</h4>
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap  align-items-center flex-row justify-content-center">
                {/* Render Products Here */}
                {this.renderDrugs()}
              </div>
              <div className="d-flex flex-direction-row align-items-center justify-content-center mt-3">
                <div className="col-4 d-flex flex-direction-row align-items-center justify-content-center">
                  <button
                    disabled={this.state.page === 1}
                    onClick={this.prevPageHandler}
                    className="btn btn-sm btn-success"
                  >
                    {"<"}
                  </button>
                  <p className="text-center text-page my-0 mx-2">
                    Page {this.state.page} of {this.state.maxPage}
                  </p>
                  <button
                    disabled={this.state.page === this.state.maxPage}
                    onClick={this.nextPageHandler}
                    className="btn btn-sm btn-success"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-check text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Obat Berkualitas
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-shipping-fast text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Gratis Ongkir
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fas fa-exchange-alt text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Garansi Obat Kembali
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-user-check text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Apoteker Handal
                </h5>
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

export default connect(mapStateToProps)(Home);
