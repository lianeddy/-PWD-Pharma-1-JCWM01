import Axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart";

class Cart extends React.Component {
  state = {
    prescriptionData: [],
    drugsData: [],
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
          alert("Tidak ditemukan data resep");
        }
      })
      .catch((err) => {
        alert("Gagal mengambil data resep");
        console.log(err);
      });
  };

  userPrescription = () => {
    return this.state.prescriptionData.map((val) => {
      return (
        <tr>
          <td className="align-middle">{val.nama_bahan_obat}</td>
          <td className="align-middle">{val.kandungan}</td>
          <td className="align-middle">Rp. {val.harga_per_mg},-</td>
          <td className="align-middle">
            Rp. {val.kandungan * val.harga_per_mg}
            ,-
          </td>
          <td className="align-middle">
            <button className="btn btn-sm btn-danger">
              <i className="fa fa-times"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  qtyBtnHandler = (id_cart, qty_obat) => {
    Axios.patch(`${API_URL}/cart/edit-cart/${id_cart}`, {
      qty_obat,
    })
      .then((res) => {
        this.props.getCartData(this.props.userGlobal.id_user);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan saat mengubah qty");
      });
  };

  deleteItem = (id_cart) => {
    Axios.delete(`${API_URL}/cart/delete-item/${id_cart}`)
      .then(() => {
        alert("Obat dihapus dari cart");
        this.props.getCartData(this.props.userGlobal.id_user);
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal hapus obat dari cart");
      });
  };

  renderTotal = () => {
    let total = 0;
    this.props.cartGlobal.cartList.forEach((val) => {
      total += val.harga * val.qty_obat;
    });
    return total;
  };

  renderCart = () => {
    return this.props.cartGlobal.cartList.map((val) => {
      return (
        <tr>
          <td className="align-middle">
            <img src={val.foto_obat} alt="" style={{ width: "50px" }} />{" "}
            {val.nama_obat}
          </td>
          <td className="align-middle">Rp. {val.harga},-</td>
          <td className="align-middle">
            <div
              className="input-group quantity mx-auto"
              style={{ width: "100px" }}
            >
              <div className="input-group-btn">
                <button
                  onClick={() => {
                    this.qtyBtnHandler(val.id_cart, val.qty_obat - 1);
                  }}
                  className="btn btn-sm btn-primary btn-minus"
                >
                  <i className="fa fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control form-control-sm bg-light text-center"
                value={val.qty_obat}
              />
              <div className="input-group-btn">
                <button
                  onClick={() => {
                    this.qtyBtnHandler(val.id_cart, val.qty_obat + 1);
                  }}
                  className="btn btn-sm btn-primary btn-plus"
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </td>
          <td className="align-middle">Rp. {val.harga * val.qty_obat},-</td>
          <td className="align-middle">
            <button
              onClick={() => this.deleteItem(val.id_cart)}
              className="btn btn-sm btn-danger"
            >
              <i className="fa fa-times"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchPrescriptionData();
  }

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center">KERANJANG BELANJA</h2>
        <div className="row px-xl-5 mt-2">
          <div className="col-lg-8 table-responsive mb-3 bg-light">
            <h4 className="text-center text-uppercase">Obat bebas</h4>
            <table className="table table-light table-borderless table-hover table-striped text-center mb-0">
              <thead className="thead-dark border-bottom">
                <tr>
                  <th>Obat</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody className="align-middle">{this.renderCart()}</tbody>
            </table>
          </div>
          <div className="bg-light col-lg-4">
            <h5 className="section-title position-relative text-uppercase text-center mb-3">
              <span className="pr-3">Cart Summary</span>
            </h5>
            <div className="p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>Rp {this.renderTotal()},-</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Biaya Pengiriman</h6>
                  <h6 className="font-weight-bold">GRATIS</h6>
                </div>
              </div>
              <div className="pt-2 text-center">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>Rp {this.renderTotal()},-</h5>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  KE PEMBAYARAN
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-xl-5 col-lg-8 table-responsive mb-5">
          <h4 className="text-center text-uppercase">Obat resep</h4>
          <table className="table table-light table-borderless table-hover table-striped text-center mb-0">
            <thead className="thead-dark border-bottom">
              <tr>
                <th>Obat</th>
                <th>Kandungan (mg)</th>
                <th>Harga / mg</th>
                <th>Total</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody className="align-middle">{this.userPrescription()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartGlobal: state.cart,
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
