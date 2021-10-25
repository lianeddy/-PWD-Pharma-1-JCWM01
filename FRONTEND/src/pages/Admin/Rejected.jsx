import React from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import moment from "moment";

class Rejected extends React.Component {
  state = {
    rejectedPrescription: [],
  };

  fetchRejectedPrescriptions = () => {
    Axios.get(`${API_URL}/prescription/get-rejected`)
      .then((result) => {
        this.setState({ rejectedPrescription: result.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderRejectedList = () => {
    return this.state.rejectedPrescription.map((val) => {
      return (
        <tr>
          <th>{val.idrejected_prescriptions}</th>
          <td className="align-middle">
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td className="align-middle">
            {moment(val.tanggal).format("DD MMMM YYYY")}
          </td>
          <td className="align-middle">{val.reason}</td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchRejectedPrescriptions();
  }

  render() {
    return (
      <div className="justify-content-center align-items-center mx-5 my-3">
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Applicant</th>
              <th scope="col">Rejection Date</th>
              <th scope="col">Reason</th>
            </tr>
          </thead>
          <tbody>{this.renderRejectedList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Rejected;
