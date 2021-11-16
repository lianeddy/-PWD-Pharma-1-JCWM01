import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/API";

class ListDataProduct extends React.Component {
  state = {
    drugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
    searchCategory: "",
    sortBy: "default",
    editId: 0,
    edit_nama_obat: "",
    edit_foto_obat: "",
    edit_satuan_jual: "",
    edit_golongan: "",
    edit_stock: 0,
    edit_harga: 0,
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

  editToggle = (editData) => {
    this.setState({
      editId: editData.idobat,
      edit_nama_obat: editData.nama_obat,
      edit_foto_obat: editData.foto_obat,
      edit_satuan_jual: editData.satuan_jual,
      edit_golongan: editData.golongan,
      edit_stock: editData.stock,
      edit_harga: editData.harga,
    });
  };

  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/obat/edit-obat/${this.state.editId}`, {
      nama_obat: this.state.edit_nama_obat,
      foto_obat: this.state.edit_foto_obat,
      satuan_jual: this.state.edit_satuan_jual,
      golongan: this.state.edit_golongan,
      stock: parseInt(this.state.edit_stock),
      harga: parseInt(this.state.edit_harga),
    })
      .then(() => {
        this.fetchDrugs();
        this.cancelEdit();
      })
      .catch(() => {
        alert("Terjadi kesalahan diserver");
      });
  };

  renderDataProduct = () => {
    return this.state.drugList.map((val) => {
      if (val.idobat === this.state.editId) {
        return (
          <tr>
            <th scope="row">{val.idobat}</th>
            <td>
              <input
                value={this.state.edit_nama_obat}
                onChange={this.inputHandler}
                name="edit_nama_obat"
                type="text"
                className="form-control"
              />
            </td>

            <td>
              <input
                value={this.state.edit_satuan_jual}
                onChange={this.inputHandler}
                name="edit_satuan_jual"
                type="text"
                className="form-control"
              />
            </td>
            <td>
              <select
                onChange={this.inputHandler}
                name="edit_golongan"
                className="form-control"
                value={this.state.edit_golongan}
              >
                <option value="Obat Bebas">Obat Bebas</option>
                <option value="Obat Bebas Terbatas">Obat Bebas Terbatas</option>
                <option value="Obat Keras">Obat Keras</option>
                <option value="Herbal">Herbal</option>
                <option value="Covid-19">Covid-19</option>
                <option value="Alat Kesehatan">Alat Kesehatan</option>
                <option value="Obat Khusus Resep">Obat Khusus Resep</option>
              </select>
            </td>
            <td>
              <input
                value={this.state.edit_stock}
                onChange={this.inputHandler}
                name="edit_stock"
                type="number"
                className="form-control"
              />
            </td>
            <td>
              <input
                value={this.state.edit_harga}
                onChange={this.inputHandler}
                name="edit_harga"
                type="number"
                className="form-control"
              />
            </td>
            <td>
              <input
                value={this.state.edit_foto_obat}
                onChange={this.inputHandler}
                name="edit_foto_obat"
                type="text"
                className="form-control"
              />
            </td>
            <td>
              <button
                onClick={this.saveBtnHandler}
                className="btn btn-sm btn-primary"
              >
                Save
              </button>
            </td>
            <td>
              <button
                onClick={this.cancelEdit}
                className="btn btn-sm btn-primary"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <th scope="row">{val.idobat}</th>
          <td>{val.nama_obat}</td>
          <td>{val.satuan_jual}</td>
          <td>{val.golongan}</td>
          <td>{val.stock}</td>
          <td>Rp {val.harga.toLocaleString("id")}</td>
          <td>
            <img src={val.foto_obat} alt="" style={{ width: "50px" }} />
          </td>
          <td>
            <button
              onClick={() => this.editToggle(val)}
              className="btn btn-sm btn-primary"
            >
              Edit
            </button>
          </td>
        </tr>
      );
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
      <div className="px-5 py-5">
        <div className="d-flex flex-row col-md-3">
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
            <option value="Obat Khusus Resep">Obat Khusus Resep</option>
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
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID Obat</th>
              <th scope="col">Nama Obat</th>
              <th scope="col">Satuan Jual</th>
              <th scope="col">Golongan</th>
              <th scope="col">Stock</th>
              <th scope="col">Harga</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderDataProduct()}</tbody>
        </table>
        <div className="mt-2 mb-2">
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

export default ListDataProduct;
