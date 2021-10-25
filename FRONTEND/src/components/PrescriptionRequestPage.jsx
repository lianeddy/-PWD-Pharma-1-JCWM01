import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/API";
import moment from "moment";

class PrescriptionRequestPage extends React.Component {
  state = {
    requestList: [],
  };

  fetchPrescriptionRequest = () => {
    Axios.get(`${API_URL}/prescription/get-prescriptions`)
      .then((result) => {
        this.setState({ requestList: result.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Mengambil Permintaan Resep");
      });
  };

  renderRequestList = () => {
    return this.state.requestList.map((val) => {
      return (
        <tr>
          <th>{val.id_prescriptions}</th>
          <td>
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td>{moment(val.tanggal).format("DD MMMM YYYY")}</td>
          <td>
            <Link to={`/request-detail/${val.id_prescriptions}`}>
              <button type="button" className="btn btn-outline-success">
                Execute
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchPrescriptionRequest();
  }

  render() {
    return (
      <div className="justify-content-center align-items-center mx-5 my-5">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">Request ID</th>
              <th scope="col">Applicant</th>
              <th scope="col">Request Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderRequestList()}</tbody>
        </table>
      </div>
    );
  }
}

export default PrescriptionRequestPage;
