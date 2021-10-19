import Axios from "axios";
import React from "react";
import { API_URL } from "../constants/API";

class SubstanceUsage extends React.Component {
  state = {
    usageList: [],
  };

  fetchSubstanceUsage = () => {
    Axios.get(`${API_URL}/cart/substance-history`)
      .then((result) => {
        this.setState({ usageList: result.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Mengambil Permintaan Resep");
      });
  };

  renderRequestList = () => {
    return this.state.usageList.map((val) => {
      return (
        <tr>
          <th>{val.idprescription_cart}</th>
          <td>
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td>{val.nama_bahan_obat}</td>
          <td>{val.kandungan} mg</td>
          <td>2021/10/19</td>
          <td>"PENDING"</td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchSubstanceUsage();
  }

  render() {
    return (
      <>
        <form className="form-inline justify-content-center mt-3">
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="search"
              className="form-control"
              placeholder="Search History Usage"
            />
            <button type="submit" className="btn btn-primary ml-2">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
        <div className="justify-content-center align-items-center mx-5 my-3">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Applicant</th>
                <th scope="col">Bahan Obat</th>
                <th scope="col">Kandungan</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{this.renderRequestList()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default SubstanceUsage;
