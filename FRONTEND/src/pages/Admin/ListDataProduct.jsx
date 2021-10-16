import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/API";

class ListDataProduct extends React.Component {
  state = {
    productList: [],
  };

  fetchDataProduct = () => {
    Axios.get(`${API_URL}/obat/get`)
      .then((result) => {
        this.setState({ productList: result.data });
        console.log(this.state.productList);
      })
      .catch((err) => {
        console.log(err);
        alert(`Terjadi kesalahan di server`);
      });
  };

  renderDataProduct = () => {
    let no = 1;
    return this.state.productList.map((val) => {
      return (
        <tr>
          <th scope="row">{val.idobat}</th>
          <td>{val.nama_obat}</td>
          <td>{val.satuan_jual}</td>
          <td>{val.golongan}</td>
          <td>{val.stock}</td>
          <td>{val.harga}</td>
          <td>
            <Link to={`/admin-edit-product/${val.id_obat}`}>Edit</Link>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchDataProduct();
  }

  render() {
    return (
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID Obat</th>
              <th scope="col">Nama Obat</th>
              <th scope="col">Satuan Jual</th>
              <th scope="col">Golongan</th>
              <th scope="col">Stock</th>
              <th scope="col">Harga</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>{this.renderDataProduct()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListDataProduct;
