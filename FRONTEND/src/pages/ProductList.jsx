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
    sortBy: "",
  };

  renderDrugs = () => {
    if (this.state.searchCategory === "" && this.state.sortBy === "") {
      Axios.get(`${API_URL}/obat/get-drug`)
        .then((result) => {
          this.setState({ drugList: result.data });
          return this.state.drugList.map((val) => {
            <ProductCard productData={val} />;
          });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.renderDrugs();
  }

  render() {
    return (
      <div className="container row mt-3">
        <div className="col-3">
          <div className="card">
            <div className="card-header text-center">
              <strong>Filter Obat</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchCategory">Kategori Obat</label>
              <select name="searchCategory" className="form-control">
                <option value="">Semua Obat</option>
                <option value="Obat Bebas">Obat Bebas</option>
                <option value="Obat Bebas Terbatas">Obat Bebas Terbatas</option>
                <option value="Obat Keras">Obat Keras</option>
                <option value="Herbal">Herbal</option>
                <option value="Covid-19">Covid-19</option>
                <option value="Alat Kesehatan">Alat Kesehatan</option>
              </select>
              <label className="mt-2" htmlFor="sortBy">
                Urutkan
              </label>
              <select name="sortBy" className="form-control">
                <option value="">Default</option>
                <option value="lowPrice">Harga Terendah</option>
                <option value="highPrice">Harga Tertinggi</option>
                <option value="az">Nama Obat A-Z</option>
                <option value="za">Nama Obat Z-A</option>
              </select>
              <button className="btn btn-info mt-3">Reset</button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex flex-wrap flex-row">
            {/* Render Products here */}
            {this.renderDrugs()}
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <button className="btn btn-dark">{"<"}</button>
              <div className="text-center">Page 1 of 1</div>
              <button className="btn btn-dark">{">"}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
