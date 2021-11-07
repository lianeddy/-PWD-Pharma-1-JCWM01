import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from ".././constants/API";
import { userKeepLogin } from "../redux/actions/user";

class Checkout extends React.Component {
  state = {
    prescriptionData: [],
    edit: false,
    edit_alamat: "",
    paymentMethod: "",
  };

  fetchPrescriptionData = () => {
    Axios.get(`${API_URL}/cart/render-prescription`, {
      params: {
        id_user: this.props.userGlobal.id_user,
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

  userPrescription = () => {
    return this.state.prescriptionData.map((val) => {
      let total = val.kandungan * val.harga_per_mg;
      return (
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex flex-row">
            <strong>
              {val.nama_bahan_obat} ({val.kandungan} mg)
            </strong>
          </div>

          <strong>Rp {total.toLocaleString("id")}</strong>
        </div>
      );
    });
  };

  grandTotal = () => {
    let total = 0;
    let total1 = 0;
    let total2 = 0;
    this.props.cartGlobal.cartList.forEach((val) => {
      total1 += val.harga * val.qty_obat;
    });

    this.state.prescriptionData.forEach((val) => {
      total2 += val.kandungan * val.harga_per_mg;
    });

    return (total = total1 + total2).toLocaleString("id");
  };

  prescriptionTotal = () => {
    let total = 0;
    this.state.prescriptionData.forEach((val) => {
      total += val.kandungan * val.harga_per_mg;
    });
    return total.toLocaleString("id");
  };

  editToggle = () => {
    this.setState({ edit: true, edit_alamat: this.props.userGlobal.alamat });
  };

  cancelEdit = () => {
    this.setState({ edit: false });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveBtnHandler = () => {
    Axios.patch(
      `${API_URL}/user/edit-profile/${this.props.userGlobal.id_user}`,
      {
        alamat: this.state.edit_alamat,
      }
    )
      .then(() => {
        alert("Alamat Pengiriman anda telah diubah");
        this.setState({ edit: false });
        this.props.userKeepLogin(this.props.userGlobal);
      })
      .catch((err) => console.log(err));
  };

  renderCart = () => {
    return this.props.cartGlobal.cartList.map((val) => {
      let total = val.harga * val.qty_obat;
      return (
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex flex-row">
            <img src={val.foto_obat} alt="" style={{ width: "50px" }} />
            <strong>
              {val.nama_obat} ({val.qty_obat} {val.satuan_jual})
            </strong>
          </div>

          <strong>Rp {total.toLocaleString("id")}</strong>
        </div>
      );
    });
  };

  renderTotal = () => {
    let total = 0;
    this.props.cartGlobal.cartList.forEach((val) => {
      total += val.harga * val.qty_obat;
    });
    return total.toLocaleString("id");
  };

  paymentDescription = () => {
    if (this.state.paymentMethod === "Transfer Bank") {
      return (
        <div className="mt-3">
          <p className="text-center">Pembayaran dengan metode Transfer Bank</p>
          <ol>
            <li>
              Transfer dengan jumlah Rp <strong>{this.grandTotal()}</strong> ke
              rekening Bank XXXX dengan nomor rekening xxx.xxxxx.xxxx atas nama
              xxxx xxxx xxxx
            </li>
            <li>
              Kirim bukti transfer (foto resi / screenshot bukti pembayaran) di
              halaman setelah anda klik tombol "Saya Telah Bayar" di bawah
            </li>
            <li>Pesanan anda akan kami proses dalam waktu 1 x 24 jam</li>
            <li>
              Jika dalam 1 x 24 jam pesanan anda belum diproses, dana anda akan
              dikembalikan penuh ke rekening pengirim
            </li>
          </ol>
        </div>
      );
    } else if (this.state.paymentMethod === "") {
      return null;
    } else {
      return (
        <div className="mt-3">
          <p className="text-center">
            Mohon maaf, pembayaran dengan metode Ovo/ Go-Pay/ Shoope-Pay saat
            ini belum tersedia
          </p>
        </div>
      );
    }
  };

  userRender = () => {
    if (this.state.edit === true) {
      return (
        <div className="row">
          <div className="row mt-2">
            <div className="col-md-4">
              <h6 className="labels">Nama Depan</h6>
              <p>{this.props.userGlobal.nama_depan}</p>
            </div>
            <div className="col-md-8">
              <h6 className="labels">Nama Belakang</h6>
              <p>{this.props.userGlobal.nama_belakang}</p>
            </div>
            <div className="col-md-6">
              <h6 className="labels">E-mail</h6>
              <p>{this.props.userGlobal.email}</p>
            </div>
            <div className="col-md-12">
              <h6 className="labels">Alamat Pengiriman</h6>
              <textarea
                onChange={this.inputHandler}
                name="edit_alamat"
                type="text"
                className="form-control"
                value={this.state.edit_alamat}
              ></textarea>
            </div>
            <div className="mt-4">
              <button
                onClick={this.saveBtnHandler}
                className="btn btn-primary profile-button mx-2"
                type="button"
              >
                Simpan
              </button>
              <button
                onClick={this.cancelEdit}
                className="btn btn-danger profile-button"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="row">
            <div className="row mt-2">
              <div className="col-md-4">
                <h6 className="labels">Nama Depan</h6>
                <p>{this.props.userGlobal.nama_depan}</p>
              </div>
              <div className="col-md-8">
                <h6 className="labels">Nama Belakang</h6>
                <p>{this.props.userGlobal.nama_belakang}</p>
              </div>
            </div>
            <div className="col-md-6">
              <h6 className="labels">E-mail</h6>
              <p>{this.props.userGlobal.email}</p>
            </div>
            <div className="col-md-12">
              <h6 className="labels">Alamat Pengiriman</h6>
              <p>{this.props.userGlobal.alamat}</p>
            </div>
          </div>
          <button onClick={this.editToggle} className="btn btn-info">
            Ubah Alamat Pengiriman
          </button>
        </>
      );
    }
  };

  componentDidMount() {
    this.fetchPrescriptionData();
  }

  render() {
    if (this.props.userGlobal.id_user) {
      return (
        <div className="container-fluid px-5">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "100px" }}
          >
            <h1 className="font-weight-semi-bold display-5 text-uppercase mb-1">
              checkout
            </h1>
            <div className="d-inline-flex">
              <p className="m-0">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-dark"
                  to="/cart"
                >
                  Kembali ke Cart
                </Link>
              </p>
            </div>
          </div>

          <div className="row px-xl-5 mt-5">
            <div className="col-lg-6">
              <div className="mb-4">
                <h4 className="font-weight-semi-bold mb-4 display-6">
                  Data Pembeli
                </h4>
                {this.userRender()}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-secondary mb-2">
                <div className="card-header bg-light border-0">
                  <h4 className="font-weight-semi-bold m-0 text-uppercase">
                    Detail Belanja
                  </h4>
                </div>
                <div className="card-body">
                  <h6 className="font-weight-semi-bold m-0 text-uppercase text-center">
                    Detail Belanja Obat
                  </h6>
                  <hr className="mt-0" />
                  {this.renderCart()}
                  <hr className="mt-0" />
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <strong className="font-weight-medium">Subtotal</strong>
                    <strong className="font-weight-medium">
                      Rp {this.renderTotal()}
                    </strong>
                  </div>
                  {this.state.prescriptionData.length ? (
                    <>
                      <h6 className="font-weight-semi-bold m-0 text-uppercase text-center">
                        Detail Obat Resep
                      </h6>
                      <hr className="mt-0" />
                      {this.userPrescription()}
                      <hr className="mt-0" />
                      <div className="d-flex justify-content-between mb-3 pt-1">
                        <strong className="font-weight-medium">Subtotal</strong>
                        <strong className="font-weight-medium">
                          Rp {this.prescriptionTotal()}
                        </strong>
                      </div>
                    </>
                  ) : null}
                  <hr className="mt-0" />
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <strong className="font-weight-medium">
                      Total Belanja
                    </strong>
                    <strong className="font-weight-medium">
                      Rp {this.grandTotal()}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong className="font-weight-medium">
                      Biaya Pengiriman
                    </strong>
                    <strong className="font-weight-medium">FREE</strong>
                  </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <div className="d-flex justify-content-between mt-2">
                    <h5 className="text-uppercase">Grand Total</h5>
                    <h5 className="font-weight-bold">Rp {this.grandTotal()}</h5>
                  </div>
                </div>
              </div>
              <div className="card border-secondary mb-5">
                <div className="card-header bg-light border-0">
                  <h4 className="font-weight-semi-bold m-0">Payment</h4>
                </div>
                <div className="card-body">
                  <label className="labels mb-1">Metode Pembayaran</label>
                  <select
                    onChange={this.inputHandler}
                    className="form-select"
                    name="paymentMethod"
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="OVO">OVO</option>
                    <option value="Go-Pay">Go-Pay</option>
                    <option value="Shopee-Pay">Shopee-Pay</option>
                  </select>
                  {this.paymentDescription()}
                </div>
                {this.state.paymentMethod === "Transfer Bank" ? (
                  <div className="justify-content-center text-center">
                    <Link
                      to={`/payment-proof/${this.props.userGlobal.id_user}`}
                    >
                      <button className="btn btn-lg btn-primary font-weight-bold my-3 py-3">
                        Saya Telah Bayar
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="justify-content-center text-center">
                    <button
                      disabled
                      className="btn btn-lg btn-primary font-weight-bold my-3 py-3"
                    >
                      Saya Telah Bayar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cartGlobal: state.cart,
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
