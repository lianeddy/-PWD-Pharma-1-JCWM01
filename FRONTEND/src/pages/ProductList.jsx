import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class ProductList extends React.Component {
  state = {
    drugList: [],
    filterDrugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
    searchCategory: "",
    sortBy: "",
  };

  fetchDrugs = () => {
    Axios.get(`${API_URL}/obat/get-drug`)
      .then((result) => {
        this.setState({
          drugList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderDrugs = () => {
    return this.state.drugList
      .slice(this.state.page - 1, this.state.itemPerPage)
      .map((val) => {
        return <ProductCard productData={val} />;
      });
  };

  componentDidMount() {
    this.fetchDrugs();
  }

  render() {
    return (
      <div className="container-fluid row mt-3">
        <h3 className="text-center">DAFTAR OBAT</h3>
        <div className="col-2">
          <div className="card">
            <div className="card-header">
              <strong>Filter</strong>
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
        <div className="col-10">
          <div className="d-flex flex-wrap flex-row">
            {/* Render Products here */}
            {this.renderDrugs()}
          </div>
        </div>
        <div className="mt-5 mb-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button className="btn btn-primary">{"<"}</button>
            <div className="text-center mx-2">
              Page {this.state.page} of {this.state.maxPage}
            </div>
            <button className="btn btn-primary">{">"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
