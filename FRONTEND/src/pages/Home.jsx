import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { connect } from "react-redux";
import CategoriesCarousel from "../components/CategoriesCarousel";
// import CategoriesCarousel from "../components/CategoriesCarousel";

class Home extends React.Component {
  state = {
    drugList: [],
    categoryDrugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
    searchProductName: "",
    searchCategory: "",
    sortProduct: "",
  };

  // perlu fix sort by supaya saat next page ngga ke-reset

  fetchProducts = () => {
    Axios.get(
      `http://localhost:3300/obat/get?page=${this.state.page - 1}&nama_obat=${
        this.props.userGlobal.searchProduct
      }&golongan=${this.state.searchCategory}`
    )
      .then((result) => {
        this.setState({ drugList: result.data }, this.fetchMaxPage());
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };

  fetchCategoryList = () => {
    Axios.get(`http://localhost:3300/obat/get-drug-category`)
      .then((result) => {
        // console.log("hasil",result.data);
        this.setState({ categoryDrugList: result.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  categoryHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, this.fetchFilterDrug);
    this.setState({page:1})
  };

  fetchMaxPage = () => {
    console.log(this.state.searchCategory);
    Axios.get(
      `http://localhost:3300/obat/get-drug-max-page?golongan=${this.state.searchCategory}`
    )
      .then((result) => {
        console.log(result.data[0]);
        this.setState({
          maxPage: Math.ceil(
            result.data[0].sumProduct / this.state.itemPerPage
          ),
        });
        console.log("checkMaxPage", this.state.maxPage);
      })
      .catch((err) => {
        alert(err);
      });
  };

  renderProducts = () => {
    let rawData = [...this.state.drugList];
    return rawData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  //   <option onClick={() => this.categoryHandler(val.golongan)}>
  //   {capital}
  // </option>

  renderCategory = () => {
    return this.state.categoryDrugList.map((val) => {
      const capital =
        val.golongan.charAt(0).toUpperCase() + val.golongan.slice(1);
      if (this.state.searchCategory === "") {
        return <option value={val.golongan}>{capital}</option>;
      } else {
        if (val.golongan === this.state.searchCategory) {
          return <option value={val.golongan}>{capital}</option>;
        } else {
          return <option value={val.golongan}>{capital}</option>;
        }
      }
    });
  };

  clearFilter = () => {
    this.setState({ searchCategory: "" });
    this.fetchFilterDrug();
    this.setState({page:1})
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.userGlobal.searchProduct !== this.props.userGlobal.searchProduct
    ) {
      this.fetchFilterDrug();
    }
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCategoryList();
    this.fetchMaxPage();
    console.log(this.props.userGlobal.searchProduct);
  }

  nextPageHandler = () => {
    this.setState({ page: this.state.page + 1 }, this.fetchProducts);
  };

  prevPageHandler = () => {
    this.setState({ page: this.state.page - 1 }, this.fetchProducts);
  };

  searchInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  searchButtonHandler = () => {
    // Axios.get("http://localhost:3300/obat/sortBy")
    // .then()
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
  // searchInputHandler = (event) => {
  inputHandler = (event) => {
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

  sortHandler = (event) => {
    const value = event.target.value;

    this.setState({ sortProduct: value }, this.fetchFilterDrug);
  };

  fetchFilterDrug = () => {
    console.log("sortby", this.state.sortProduct);
    console.log("golongan", this.state.searchCategory);
    console.log("nama_obat", this.props.userGlobal.searchProduct);
    this.fetchMaxPage();

    Axios.get(
      `http://localhost:3300/obat/get?page=${this.state.page - 1}&sortby=${
        this.state.sortProduct
      }&golongan=${this.state.searchCategory}&nama_obat=${
        this.props.userGlobal.searchProduct
      }`
    )
      .then((result) => {
        this.setState({ drugList: result.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="container-style px-5 my-3">
        <CategoriesCarousel />
        <h4 className="display-5 text-uppercase text-center">Daftar Obat</h4>
        <h6 className="text-start text-uppercase">
          filter <i className="fas fa-filter"></i>
        </h6>
        <div className="d-flex flex-row col-3">
          <select
            onChange={this.sortHandler}
            name="sortProduct"
            className="form-control filter-style"
          >
            <option value="">SORT BY</option>
            <option value="price_asc">Lowest price</option>
            <option value="price_desc">Highest price</option>
            <option value="name_asc">A to Z</option>
            <option value="name_desc">Z to A</option>
          </select>
          <select
            onChange={this.categoryHandler}
            name="searchCategory"
            className="form-control filter-style"
          >
            <option value="">CATEGORIES</option>
            {this.renderCategory()}
          </select>
          <button
            className="btn btn-dark btn-sm ms-2 filter"
            onClick={this.clearFilter}
          >
            Reset
          </button>
        </div>
        <div className=" row col-12 bg-white mt-3">
          <div className="d-flex flex-direction-row align-items-center justify-content-center"></div>

          {this.state.drugList.length === 0 ? (
            <div className="d-flex align-items-center flex-row justify-content-center mt-5">
              <h4>sorry error page!</h4>
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap  align-items-center flex-row justify-content-center">
                {/* Render Products Here */}
                {this.renderProducts()}
              </div>
              <div className="d-flex flex-direction-row align-items-center justify-content-center mt-3">
                <div className="col-4 d-flex flex-direction-row align-items-center justify-content-center">
                  <button
                    disabled={this.state.page === 1}
                    onClick={this.prevPageHandler}
                    className="btn btn-sm btn-dark"
                  >
                    {"<"}
                  </button>
                  <p className="text-center text-page my-0 mx-2">
                    Page {this.state.page} of {this.state.maxPage}
                  </p>
                  <button
                    disabled={this.state.page === this.state.maxPage}
                    onClick={this.nextPageHandler}
                    className="btn btn-sm btn-dark"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-check text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Obat Berkualitas
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-shipping-fast text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Gratis Ongkir
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fas fa-exchange-alt text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Garansi Obat Kembali
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-dark mb-4"
                style={{ padding: "30px" }}
              >
                <h1 className="fa fa-user-check text-white m-0"></h1>
                <h5 className="font-weight-semi-bold text-white mx-auto">
                  Apoteker Handal
                </h5>
              </div>
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

export default connect(mapStateToProps)(Home);
