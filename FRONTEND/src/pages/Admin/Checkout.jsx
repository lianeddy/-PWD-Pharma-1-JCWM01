import Axios from "axios";
import React from "react";
import { API_URL } from "../../constants/API";
import moment from "moment";
import CheckoutModal from "../../components/CheckoutModal";

class CheckoutRequestPage extends React.Component {
  state = {
    checkoutList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 5,
  };

  fetchCheckoutRequest = () => {
    Axios.get(`${API_URL}/cart/unconfirmed-checkout`)
      .then((result) => {
        return (
          this.setState({
            maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          }),
          Axios.get(`${API_URL}/cart/render-unconfirmed-checkout`, {
            params: {
              page: (this.state.page - 1) * this.state.itemPerPage,
              item: this.state.itemPerPage,
            },
          })
            .then((result) => {
              return this.setState({ checkoutList: result.data });
            })
            .catch((err) => console.log(err))
        );
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Mengambil Data Checkout");
      });
  };

  checkoutConfirm = (id) => {
    Axios.patch(`${API_URL}/cart/checkout-update/${id}`, {
      status: "Terkonfirmasi",
    })
      .then(() => {
        alert(`Checkout terkonfirmasi`);
        this.fetchCheckoutRequest();
      })
      .catch((err) => console.log(err));
  };

  checkoutReject = (id) => {
    Axios.patch(`${API_URL}/cart/checkout-update/${id}`, {
      status: "Ditolak",
    })
      .then(() => {
        alert(`Checkout ditolak`);
        this.fetchCheckoutRequest();
      })
      .catch((err) => console.log(err));
  };

  renderCheckoutList = () => {
    return this.state.checkoutList.map((val) => {
      return (
        <tr>
          <th>{val.idcheckout}</th>
          <td>
            {val.nama_depan} {val.nama_belakang}
          </td>
          <td>{moment(val.tanggal).format("DD MMMM YYYY")}</td>
          <td>
            <CheckoutModal idcheckout={val.idcheckout} />
          </td>
          <td className="d-flex justify-content-evenly">
            <button
              onClick={() => {
                this.checkoutConfirm(val.idcheckout);
              }}
              className="btn btn-sm btn-success"
              type="button"
              className="btn btn-success"
            >
              Konfirmasi
            </button>
            <button
              onClick={() => {
                this.checkoutReject(val.idcheckout);
              }}
              type="button"
              className="btn btn-danger"
            >
              Tolak
            </button>
          </td>
        </tr>
      );
    });
  };

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
      this.fetchCheckoutRequest();
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
      this.fetchCheckoutRequest();
    }
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
              <th scope="col">Tanggal Checkout</th>
              <th scope="col">Detail Checkout</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderCheckoutList()}</tbody>
        </table>
        <div className="mt-5 mb-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button onClick={this.prevPageHandler} className="btn btn-warning">
              {"<"}
            </button>
            <div className="text-center mx-2">
              <strong>
                Page {this.state.page} of {this.state.maxPage}
              </strong>
            </div>
            <button onClick={this.nextPageHandler} className="btn btn-warning">
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutRequestPage;
