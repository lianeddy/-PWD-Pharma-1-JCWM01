import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import CategoriesCarousel from "../components/CategoriesCarousel";

class Home extends React.Component {
  state = {
    drugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
  };

  fetchProducts = () => {
    Axios.get("http://localhost:3300/obat/get")
      .then((result) => {
        this.setState({
          drugList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.drugList];
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <div>
        <CategoriesCarousel />
        <div className="container-fluid pt-5 bg-light">
          <div className="text-center mb-4">
            <h2 className="section-title px-5">
              <span className="px-2">DAFTAR OBAT</span>
            </h2>
          </div>
          <div class="row px-xl-5 pb-3">
            {/* Drugs Product Card */}
            {this.renderProducts()}
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <button
                disabled={this.state.page === 1}
                onClick={this.prevPageHandler}
                className="btn btn-info"
              >
                {"<"}
              </button>
              <div className="text-center px-5">
                Page {this.state.page} of {this.state.maxPage}{" "}
              </div>
              <button onClick={this.nextPageHandler} className="btn btn-info">
                {">"}
              </button>
            </div>
          </div>
        </div>
        {/* KIRIM RESEP START */}
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center text-white bg-dark bg-gradient">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">KIRIM RESEP</h1>
            <p>
              AMR Pharmacy memberikan kemudahan bagi Anda untuk tebus obat resep
              tanpa antre secara online dengan adanya layanan upload resep
              dokter. Tidak perlu antri menebus resep di Rumah Sakit, Klinik,
              atau Apotek, sekarang Anda bisa langsung upload resep dokter di
              website AMR Pharmacy. Caranya mudah, dengan foto langsung resep
              obat menggunakan smartphone dan upload pada menu kirim resep yang
              tersedia di AMR Pharmacy.
            </p>
            <a className="btn btn-outline-light" href="/prescription-page">
              Kirim Resep
            </a>
          </div>
        </div>
        {/* KIRIM RESEP END */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default Home;
