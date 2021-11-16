import Axios from "axios";
import React from "react";
import { API_URL } from "../constants/API";
import moment from "moment";

class SubstanceUsage extends React.Component {
  state = {
    usageList: [],
    searchHistory: "",
  };

  fetchSubstanceUsage = () => {
    if (this.state.searchHistory !== "") {
      Axios.get(`${API_URL}/cart/search-substance`, {
        params: {
          nama_bahan_obat: this.state.searchHistory,
        },
      })
        .then((result) => {
          this.setState({ usageList: result.data });
        })
        .catch((err) => console.log(err));
    } else {
      Axios.get(`${API_URL}/cart/substance-history`)
        .then((result) => {
          this.setState({ usageList: result.data });
          console.log(this.state.searchHistory);
        })
        .catch((err) => {
          console.log(err);

          alert("Gagal Mengambil Permintaan Resep");
        });
    }
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  renderRequestList = () => {
    return this.state.usageList.map((val) => {
      return (
        <tr>
          <th>{val.idprescription_cart}</th>
          <td> {val.nama_bahan_obat}</td>
          <td>{val.kandungan} mg</td>
          <td>
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td>{moment(val.tanggal).format("DD MMMM YYYY")}</td>
          <td>{val.status}</td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchSubstanceUsage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchHistory !== this.state.searchHistory) {
      return this.fetchSubstanceUsage();
    }
  }

  render() {
    return (
      <>
        <form className="form-inline justify-content-center mt-3">
          <div className="form-group mx-auto mb-2 col-2">
            <input
              onChange={this.inputHandler}
              type="text"
              name="searchHistory"
              value={this.state.searchHistory}
              className="form-control"
              placeholder="Search History Usage"
            />
          </div>
        </form>
        <div className="justify-content-center align-items-center mx-5 my-3">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">ID RESEP</th>
                <th scope="col">Obat</th>
                <th scope="col">Kandungan</th>
                <th scope="col">Penerima</th>
                <th scope="col">Tanggal Pelayanan</th>
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
