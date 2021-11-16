import Axios from "axios";
import React from "react";
import { API_URL } from "../../constants/API";
import moment from "moment";

class CheckoutRequestPage extends React.Component {
  state = {
    checkoutList: [],
  };

  fetchCheckoutRequest = () => {
    Axios.get(`${API_URL}/cart/get-checkout`, {})
      .then((result) => {
        this.setState({ checkoutList: result.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Mengambil Data Checkout");
      });
  };

  renderCheckoutList = () => {
    return this.state.checkoutList.map((val) => {
      return (
        <tr>
          <th>{val.idcheckout}</th>
          <td>
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td>{val.status}</td>
          <td>{moment(val.tanggal).format("DD MMMM YYYY")}</td>
          <td>Rp {val.total.toLocaleString("id")}</td>
          <td>
            <img
              src={`${API_URL}/${val.payment_proof}`}
              alt=""
              style={{ width: "50px" }}
            />
          </td>
          <td className="d-flex justify-content-evenly">
            <button
              className="btn btn-sm btn-success"
              type="button"
              className="btn btn-success"
            >
              Accept
            </button>
            <button type="button" className="btn btn-danger">
              Reject
            </button>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchCheckoutRequest();
  }

  render() {
    return (
      <div className="justify-content-center align-items-center mx-5 my-2">
        <h5 className="text-center text-uppercase display-6">
          checkout request
        </h5>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">Checkout ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Total Belanja</th>
              <th scope="col">Bukti Pembayaran</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderCheckoutList()}</tbody>
        </table>
      </div>
    );
  }
}

export default CheckoutRequestPage;
