import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userKeepLogin } from "../redux/actions/user";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart";

class PaymentProof extends React.Component {
  state = {
    prescriptionData: [],
    idcheckout: 0,
    addFile: null,
    backtoCart: false,
    backtoHome: false,
  };

  fetchCheckOut = () => {
    Axios.get(`${API_URL}/cart/get-checkout`, {
      params: {
        id_user: this.props.userGlobal.id_user,
        status: "Menunggu Pembayaran",
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({
            idcheckout: result.data[0].idcheckout,
          });
          this.fetchPrescriptionData();
        }
      })
      .catch((err) => console.log(err));
  };

  fetchPrescriptionData = () => {
    Axios.get(`${API_URL}/cart/render-prescription`, {
      params: {
        id_user: this.props.userGlobal.id_user,
        status: "Menunggu Pembayaran",
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ prescriptionData: result.data });
        } else {
        }
      })
      .catch((err) => {
        alert("Gagal mengambil data resep");
        console.log(err);
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onBtAddFile = (e) => {
    if (e.target.files[0]) {
      this.setState({
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  prescriptionStatus = () => {
    this.state.prescriptionData.map((val) => {
      Axios.patch(
        `${API_URL}/cart/edit-prescription/${val.idprescription_cart}`,
        {
          status: "Menunggu Konfirmasi Pembayaran",
        }
      )
        .then(() => {
          alert("status resep diperbarui");
        })
        .catch((err) => console.log(err));
    });
  };

  cartStatus = () => {
    this.props.cartGlobal.cartList.map((val) => {
      Axios.patch(`${API_URL}/cart/edit-cart/${val.id_cart}`, {
        status: "Menunggu Konfirmasi Pembayaran",
      })
        .then(() => {
          this.props.getCartData(this.props.userGlobal.id_user);
        })
        .catch((err) => console.log(err));
    });
  };

  saveBtn = () => {
    if (this.state.addFile) {
      let formData = new FormData();

      formData.append("file", this.state.addFile);
      Axios.patch(
        `${API_URL}/picture/payment-proof/${this.state.idcheckout}`,
        formData
      )
        .then((res) => {
          alert(res.data.message);

          this.cartStatus();
          this.prescriptionStatus();
          this.setState({ backtoHome: true });
        })
        .catch((err) => {
          alert("Gagal upload bukti pembayaran");
          console.log(err);
        });
    }
  };

  cancelPictureBtn = () => {
    Axios.delete(`${API_URL}/cart/delete-checkout/${this.state.idcheckout}`)
      .then(() => this.setState({ backtoCart: true }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchCheckOut();
  }

  render() {
    if (this.state.backtoHome === true) {
      return <Redirect to="/" />;
    } else if (this.state.backtoCart === true) {
      return <Redirect to={`/checkout/${this.props.userGlobal.id_user}`} />;
    } else {
      return (
        <div className="container rounded bg-light my-5">
          <div className="row">
            <div className="border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  id="imgpreview"
                  className="img-fluid"
                  width="300px"
                  src={`${API_URL}/${this.state.paymentProof}`}
                  alt=""
                />
                <div class="form-group mx-auto text-center align-items-center mt-2">
                  <label className="font-weight-medium">
                    Unggah bukti transfer pada form di bawah
                  </label>
                  <input
                    type="file"
                    className="form-control mt-2"
                    id="img"
                    onChange={this.onBtAddFile}
                  />
                </div>
                <div className="mt-5 text-center">
                  {this.state.addFile !== null ? (
                    <button
                      onClick={this.saveBtn}
                      className="btn btn-lg btn-primary"
                    >
                      Unggah
                    </button>
                  ) : (
                    <button disabled className="btn btn-lg btn-primary">
                      Unggah
                    </button>
                  )}
                  <button
                    onClick={this.cancelPictureBtn}
                    className="btn btn-lg btn-danger mx-2"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentProof);
