import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";

class RawDrugList extends React.Component {
  state = {
    drugList: [],
    restockId: 0,
    restock: 0,
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
    searchCategory: "",
    sortBy: "default",
  };

  fetchDataProduct = () => {
    if (this.state.searchCategory === "") {
      Axios.get(`${API_URL}/obat/get-raw-drug`)
        .then(
          (result) =>
            this.setState({
              maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
            }),
          Axios.get(`${API_URL}/obat/get-raw-drug`, {
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
      Axios.get(`${API_URL}/obat/raw-drug-list`, {
        params: {
          golongan: this.state.searchCategory,
        },
      })
        .then(
          (result) =>
            this.setState({
              maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
            }),
          Axios.get(`${API_URL}/obat/raw-drug-list`, {
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

  restockToggle = (restockData) => {
    this.setState({
      restockId: restockData.id_bahan_obat,
    });
  };

  cancelRestock = () => {
    this.setState({ restockId: 0 });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  sortCategoryHandler = (event) => {
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

  proceedHandler = (id_bahan_obat, stock_botol, qty) => {
    Axios.patch(`${API_URL}/prescription/restock-substance/${id_bahan_obat}`, {
      stock_botol,
      stock_mg: qty,
    })
      .then(() => {
        this.fetchDataProduct();
        this.cancelRestock();
      })
      .catch((err) => console.log(err));
  };

  renderDataProduct = () => {
    return this.state.drugList.map((val) => {
      if (val.id_bahan_obat === this.state.restockId) {
        return (
          <tr>
            <th>{val.id_bahan_obat}</th>
            <td>{val.nama_bahan_obat}</td>
            <td>{val.golongan}</td>
            <td>{val.stock_botol} Botol</td>
            <td>{val.volume_botol} mg</td>
            <td>{val.stock_mg} mg</td>
            <td>Rp. {val.harga_per_mg},-</td>
            <td>
              <input
                type="number"
                style={{ width: "70px" }}
                onChange={this.inputHandler}
                name="restock"
                className="form-sm-control"
              />
            </td>
            <td>
              <button
                onClick={() =>
                  this.proceedHandler(
                    val.id_bahan_obat,
                    (val.stock_botol += parseInt(this.state.restock)),
                    (val.stock_mg += val.volume_botol * this.state.restock)
                  )
                }
                className="btn btn-sm btn-info"
              >
                Proceed
              </button>
            </td>
            <td>
              <button
                onClick={this.cancelRestock}
                className="btn btn-sm btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <th>{val.id_bahan_obat}</th>
          <td>{val.nama_bahan_obat}</td>
          <td>{val.golongan}</td>
          <td>{val.stock_botol} Botol</td>
          <td>{val.volume_botol} mg</td>
          <td>{val.stock_mg} mg</td>
          <td>Rp. {val.harga_per_mg},-</td>
          <td>
            <button
              onClick={() => this.restockToggle(val)}
              className="btn btn-sm btn-warning"
            >
              Restock
            </button>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchDataProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchCategory !== this.state.searchCategory ||
      prevState.page !== this.state.page ||
      prevState.sortBy !== this.state.sortBy
    ) {
      return this.fetchDataProduct();
    }
  }

  render() {
    return (
      <div className="mx-5 my-2">
        <h5 className="text-center ">Daftar Bahan Obat Resep</h5>
        <div className="d-flex flex-row col-md-3">
          <select
            onChange={this.sortCategoryHandler}
            name="searchCategory"
            className="form-control"
          >
            <option value="">Semua Obat</option>
            <option value="Antibiotik">Antibiotik</option>
            <option value="Analgesik">Analgesik</option>
            <option value="Antihipertensi">Antihipertensi</option>
            <option value="Antidiabet">Antidiabet</option>
            <option value="Kortikosteroid">Kortikosteroid</option>
            <option value="Gout / Asam Urat">Gout / Asam Urat</option>
            <option value="Penurun Kolesterol">Penurun Kolesterol</option>
          </select>

          <select
            onChange={this.sortCategoryHandler}
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
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">ID Obat</th>
              <th scope="col">Nama Bahan Obat</th>
              <th scope="col">Golongan</th>
              <th scope="col">Stock</th>
              <th scope="col">Volume Botol</th>
              <th scope="col">Stock Total</th>
              <th scope="col">Harga per mg</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderDataProduct()}</tbody>
        </table>
        <div className="mt-2 mb-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button onClick={this.prevPageHandler} className="btn btn-warning">
              {"<"}
            </button>
            <div className="text-center mx-2">
              <strong>
                Page {this.state.page} of {this.state.maxPage}
              </strong>
            </div>
            <button onClick={this.nextPageHandler} className="btn btn-warning">
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RawDrugList;
