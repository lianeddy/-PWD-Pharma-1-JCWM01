import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import CategoriesCarousel from "../components/CategoriesCarousel";

class Home extends React.Component {
  state = {
    drugList: [],
    filterDrugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  };

  fetchProducts = () => {
    Axios.get("http://localhost:3300/obat/get")
      .then((result) => {
        this.setState({
          drugList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filterDrugList: result.data,
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filterDrugList];
    const compareString = (a, b) => {
      if (a.nama_obat < b.nama_obat) {
        return -1;
      }
      if (a.nama_obat > b.nama_obat) {
        return 1;
      }
      return 0;
    };
    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.harga_jual - b.harga_jual);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.harga_jual - a.harga_jual);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filterDrugList];
        break;
    }

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

<<<<<<< HEAD
  searchInputHandler=(event)=>{
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }
  searchButtonHandler=()=>{
    // Axios.get("http://localhost:3300/obat/sortBy")
    // .then()
    const filterDrugList = this.state.drugList.filter((val)=>{
      return val.nama_obat.toLowerCase().includes(this.state.searchProductName.toLowerCase()) &&
      val.golongan.toLowerCase().includes(this.state.searchCategory.toLowerCase())
    })
    this.setState({filterDrugList, maxPage: Math.ceil(filterDrugList.length / this.state.itemPerPage), page:1})
  }
=======
  searchInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  searchButtonHandler = () => {
    const filterDrugList = this.state.drugList.filter((val) => {
      return (
        val.nama_obat
          .toLowerCase()
          .includes(this.state.searchProductName.toLowerCase()) &&
        val.golongan
          .toLowerCase()
          .includes(this.state.searchCategory.toLowerCase())
      );
    });
    this.setState({
      filterDrugList,
      maxPage: Math.ceil(filterDrugList.length / this.state.itemPerPage),
      page: 1,
    });
  };
>>>>>>> a34c9109ce4df6f73badc68744654356107b11cb

  render() {
    return (
      <div>
        <CategoriesCarousel />
        <div className="row">
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                <strong>Filter Product</strong>
              </div>
              <div className="card-body">
                <label htmlFor="searchProductName">Product Name</label>
                <input
                  onChange={this.searchInputHandler} // masukan methode inputHandler
                  name="searchProductName"
                  type="text"
                  className="form-control mb-3"
                />
                <label htmlFor="searchCategory">Product Category</label>
                <select
                  name="searchCategory"
                  onChange={this.searchInputHandler}
                  className="form-control"
                >
                  <option value="">ALL</option>
                  <option value="obatkeras">Obat Keras</option>
                  <option value="obatbebas">Obat Bebas</option>
                  <option value="obatherbal">Obat Herbal</option>
                  <option value="alkes">Alkes</option>
                </select>
                <button
                  onClick={this.searchButtonHandler}
                  className="btn btn-primary mt-3"
                >
                  Search
                </button>
              </div>
              <div className="card mt-4">
                <div className="card-header">
                  <strong>Sort Product</strong>
                </div>
                <div className="card-body">
                  <label htmlFor="sortBy">Sort by</label>
                  <select
                    onChange={this.searchInputHandler}
                    name="sortBy"
                    className="form-control"
                  >
                    <option value="">Default</option>
                    <option value="lowPrice">Lowest Price</option>
                    <option value="highPrice">Highest Price</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="d-flex flex-wrap flex-row ">
              {this.renderProducts()}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center my-5 ">
          <button
            disabled={this.state.page === 1}
            onClick={this.prevPageHandler}
            className="btn btn-info"
          >
            {"<"}
          </button>
          <div className="text-center px-5">
            Page {this.state.page} of {this.state.maxPage}
          </div>
          <button onClick={this.nextPageHandler} className="btn btn-info">
            {">"}
          </button>
        </div>
        <p>
          AMR Pharmacy memberikan kemudahan bagi Anda untuk tebus obat resep
          tanpa antre secara online dengan adanya layanan upload resep dokter.
          Tidak perlu antri menebus resep di Rumah Sakit, Klinik, atau Apotek,
          sekarang Anda bisa langsung upload resep dokter di website AMR
          Pharmacy. Caranya mudah, dengan foto langsung resep obat menggunakan
          smartphone dan upload pada menu kirim resep yang tersedia di AMR
          Pharmacy.
        </p>
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
