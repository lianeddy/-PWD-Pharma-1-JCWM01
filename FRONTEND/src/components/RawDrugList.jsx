import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/API";

class RawDrugList extends React.Component {
  state = {
    productList: [],
  };

  fetchDataProduct = () => {
    Axios.get(`${API_URL}/obat/get-raw-drug`)
      .then((result) => {
        this.setState({ productList: result.data });
        console.log(this.state.productList);
      })
      .catch((err) => {
        console.log(err);
        alert(`Terjadi keslahan di server`);
      });
  };

  renderDataProduct = () => {
    return this.state.productList.map((val) => {
      return (
        <tr>
          <th>{val.id_bahan_obat}</th>
          <td>{val.nama_bahan_obat}</td>
          <td>{val.golongan}</td>
          <td>{val.stock_botol}</td>
          <td>{val.volume_botol}</td>
          <td>{val.stock_mg}</td>
          <td>{val.harga_per_mg}</td>
          <td>
            <button className="btn btn-sm btn-primary">Restock</button>
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
      <div className="mx-5 my-2">
        <h5 className="text-center ">Daftar Bahan Obat Resep</h5>
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">ID Obat</th>
              <th scope="col">Nama Bahan Obat</th>
              <th scope="col">Golongan</th>
              <th scope="col">Stock (Botol)</th>
              <th scope="col">Volume Botol (mg)</th>
              <th scope="col">Stock Total (mg)</th>
              <th scope="col">Harga per mg</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderDataProduct()}</tbody>
        </table>
      </div>
    );
  }
}

export default RawDrugList;
