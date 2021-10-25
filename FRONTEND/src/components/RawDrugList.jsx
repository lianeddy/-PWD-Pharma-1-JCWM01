import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";

class RawDrugList extends React.Component {
  state = {
    productList: [],
    restockId: 0,
    restock: 0,
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
    return this.state.productList.map((val) => {
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

  // renderDataProduct = () => {
  //   return this.state.productList.map((val) => {
  //     return (
  //       <tr>
  //         <th>{val.id_bahan_obat}</th>
  //         <td>{val.nama_bahan_obat}</td>
  //         <td>{val.golongan}</td>
  //         <td>{val.stock_botol}</td>
  //         <td>{val.volume_botol}</td>
  //         <td>{val.stock_mg}</td>
  //         <td>{val.harga_per_mg}</td>
  //         <td>
  //           <button className="btn btn-sm btn-warning">Restock</button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

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
              <th scope="col">Stock</th>
              <th scope="col">Volume Botol</th>
              <th scope="col">Stock Total</th>
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
