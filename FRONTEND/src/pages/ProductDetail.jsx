import React from "react";
import Axios from "axios";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`http://localhost:3300/obat/get`, {
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
        alert("Terjadi kesalahan di server");
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
                Rp. {this.state.productData.harga_jual},-
              </h3>
              <div>
                <p>
                  <strong className="text-uppercase">Deskripsi</strong>
                </p>
              </div>
              <p className="mb-4">{this.state.productData.deskripsi}</p>
              <div>
                <p>
                  <strong className="text-uppercase">
                    Indikasi / Kegunaan / Manfaat
                  </strong>
                </p>
              </div>
              <p>{this.state.productData.manfaat}</p>
              <div>
                <p>
                  <strong className="text-uppercase">Dosis</strong>
                </p>
              </div>
              <p>{this.state.productData.dosis}</p>
              <div>
                <p>
                  <strong className="text-uppercase">Kemasan</strong>
                </p>
              </div>
              <p>{this.state.productData.kemasan}</p>
              <div className="d-flex mb-4 pt-2 mx-sm-1">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary text-center mx-2"
                    value="1"
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus mr-3">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button className="btn btn-success px-10">
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
