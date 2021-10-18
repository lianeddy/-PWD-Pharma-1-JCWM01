import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`http://localhost:3300/obat/get-drug-detail?product_id=${this.props.match.params.idobat}`, {
      params: {
        idobat: this.props.match.params.obatid,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ productNotFound: true });
        }
      })
      .catch(() => {
        alert("Kesalahan saat mengambil data obat");
      });
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  addToCartHandler = () => {
    Axios.get(`${API_URL}/cart/get-cart`, {
      params: {
        id_user: this.props.userGlobal.id_user,
        idobat: this.state.productData.idobat,
      },
    }).then((result) => {
      if (result.data.length) {
        // jika barang sudah ada di cart user
        return Axios.patch(
          `${API_URL}/cart/edit-cart/${result.data[0].id_cart}`,
          {
            qty_obat: result.data[0].qty_obat + this.state.quantity,
          }
        )
          .then(() => {
            alert("Berhasil menambahkan qty ke cart");
            this.props.getCartData(this.props.userGlobal.id_user);
          })
          .catch((err) => {
            alert("Gagal saat patch data");
            console.log(err);
          });
      } else {
        // jika barang belum ada di cart user
        return Axios.post(`${API_URL}/cart/add-to-cart`, {
          id_user: this.props.userGlobal.id_user,
          idobat: this.state.productData.idobat,
          qty_obat: this.state.quantity,
          harga: this.state.productData.harga,
          status: "PENDING",
        })
          .then(() => {
            alert("Berhasil menambahkan obat ke cart");
            this.props.getCartData(this.props.userGlobal.id_user);
          })
          .catch((err) => {
            alert(`Gagal menambahkan obat ke cart`);
            console.log(err);
          });
      }
    });
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    return (
      <div>
        <div className="container-fluid bg-light mb-5">
          {this.state.productNotFound ? (
            <div className="alert alert-danger mt-3">Obat Tidak ditemukan</div>
          ) : (
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "100px" }}
            >
              <h1 className="font-weight-semi-bold text-uppercase mb-3">
                Detail Obat
              </h1>
              <div className="d-inline-flex">
                <p className="m-0">
                  <a href="/" className="text-decoration-none text-dark">
                    Kembali ke Beranda
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="container-fluid py-1">
          <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
              <div
                id="product-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner border">
                  <div className="carousel-item active">
                    <img
                      className="w-100 h-100"
                      src={this.state.productData.foto_obat}
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 pb-5">
              <h3 className="font-weight-semi-bold">
                {this.state.productData.nama_obat}
              </h3>
              <h3 className="font-weight-semi-bold mb-4">
                Rp. {this.state.productData.harga},- /
                {this.state.productData.satuan_jual}
              </h3>
              <div>
                <p>
                  <strong className="text-uppercase">Deskripsi</strong>
                </p>
                <p className="mt-1">{this.state.productData.deskripsi}</p>
              </div>
              <div>
                <p>
                  <strong className="text-uppercase">Golongan</strong>
                </p>
              </div>
              <p className="mt-2">{this.state.productData.golongan}</p>
              <div>
                <p>
                  <strong className="text-uppercase">Stock</strong>
                </p>
              </div>
              {this.state.productData.stock > 50 ? (
                <p> Lebih dari 50 </p>
              ) : (
                <p> Kurang dari 50 </p>
              )}

              <div className="d-flex align-items-center mt-5">
                <div
                  className="input-group quantity"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      onClick={() => this.qtyBtnHandler("decrement")}
                      className="btn btn-primary btn-minus"
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <p className="text-center mx-auto pt-1 font-weight-bold">
                    {this.state.quantity}
                  </p>
                  <div className="input-group-btn">
                    <button
                      onClick={() => this.qtyBtnHandler("increment")}
                      className="btn btn-primary btn-plus mr-3"
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={this.addToCartHandler}
                className="btn btn-success mt-3"
              >
                <i className="fa fa-shopping-cart"></i> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
