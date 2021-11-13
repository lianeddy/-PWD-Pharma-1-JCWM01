import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class ProductList extends React.Component {
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
      <div className="container-fluid row mt-3">
        <h3 className="text-center display-6">DAFTAR OBAT</h3>
        <h6 className="text-start text-uppercase">
          filter <i className="fas fa-filter"></i>
        </h6>
        <div className="d-flex flex-row col-sm-3">
          <select
            onChange={this.inputHandler}
            name="searchCategory"
            className="form-control"
          >
            <option value="">Semua Obat</option>
            <option value="Obat Bebas">Obat Bebas</option>
            <option value="Obat Bebas Terbatas">Obat Bebas Terbatas</option>
            <option value="Obat Keras">Obat Keras</option>
            <option value="Herbal">Herbal</option>
            <option value="Covid-19">Covid-19</option>
            <option value="Alat Kesehatan">Alat Kesehatan</option>
          </select>

          <select
            onChange={this.inputHandler}
            name="sortBy"
            className="form-control"
          >
            <option value="default">Default</option>
            <option value="lowPrice">Harga Terendah</option>
            <option value="highPrice">Harga Tertinggi</option>
            <option value="az">Nama Obat A-Z</option>
            <option value="za">Nama Obat Z-A</option>
          </select>
        </div>
        <div className="col-12">
          <div className="d-flex flex-wrap  align-items-center flex-row justify-content-center">
            {/* Render Products here */}
            {this.renderDrugs()}
          </div>
        </div>
        <div className="mt-5 mb-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button onClick={this.prevPageHandler} className="btn btn-success">
              {"<"}
            </button>
            <div className="text-center mx-2">
              <strong>
                Page {this.state.page} of {this.state.maxPage}
              </strong>
            </div>
            <button onClick={this.nextPageHandler} className="btn btn-success">
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
