import React from "react";
import { Link } from "react-router-dom";

class PrescriptionRequestPage extends React.Component {
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
          <tbody>
            <th scope="row">1</th>
            <td>Mr. Ryan Dwiky</td>
            <td>2021-10-14</td>
            <td>
              <Link to="/request-detail">
                <button type="button" className="btn btn-outline-success">
                  Execute
                </button>
              </Link>
            </td>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrescriptionRequestPage;
