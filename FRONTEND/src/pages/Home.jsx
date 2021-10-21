import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { connect } from "react-redux";
// import CategoriesCarousel from "../components/CategoriesCarousel";

class Home extends React.Component {
  state = {
    drugList: [],
    categoryDrugList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 6,
    searchProductName: "",
    searchCategory: "",
    sortProduct: "",
  };

  fetchProducts = () => {
    Axios.get(
      `http://localhost:3300/obat/get?page=${this.state.page - 1}&nama_obat=${
        this.props.userGlobal.searchProduct
      }`
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

  categoryHandler = (golongan) => {
    this.setState({ searchCategory: golongan });
    this.setState({ page: 1 });
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

  renderCategory = () => {
    return this.state.categoryDrugList.map((val) => {
      const capital =
        val.golongan.charAt(0).toUpperCase() + val.golongan.slice(1);
      if (this.state.searchCategory === "") {
        return (
          <li>
            <button
              onClick={() => this.categoryHandler(val.golongan)}
              className="button-second btn btn-primary"
            >
              <p>{capital}</p>
            </button>
          </li>
        );
      } else {
        if (val.golongan === this.state.searchCategory) {
          return (
            <li>
              <button
                onClick={() => this.categoryHandler(val.golongan)}
                className="button-second selected btn btn-info"
              >
                <p>{capital}</p>
              </button>
            </li>
          );
        } else {
          return (
            <li>
              <button
                onClick={() => this.categoryHandler(val.golongan)}
                className="button-second"
                style={{ color: "lightgrey" }}
              >
                <p>{capital}</p>
              </button>
            </li>
          );
        }
      }
    });
  };

  clearFilter = () => {
    this.setState({ searchCategory: "" });
    this.fetchProducts();
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
      <div className=" mt-4 mb-5 container-style">
        <div className="row">
          <div className="col-2 filter-bar">
            <ul>{this.renderCategory()}</ul>
            <div>
              <button
                className="btn btn-dark btn-sm filter"
                onClick={this.fetchFilterDrug}
              >
                <p>Filter</p>
              </button>
              <button
                className="btn btn-light btn-sm ms-2 filter"
                onClick={this.clearFilter}
              >
                <p>Reset Filter</p>
              </button>
            </div>
          </div>

          <div className="col-10 ">
            <div className="d-flex flex-direction-row align-items-center justify-content-between mb-3">
              <div className="d-flex flex-direction-row align-items-center justify-content-start col-4 px-3">
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
              </div>

            </div>

            {this.state.drugList.length === 0 ? (
              <div className="d-flex align-items-center flex-row justify-content-center mt-5">
                <h4>sorry error page!</h4>
              </div>
            ) : (
              <>
                <div className="d-flex flex-wrap  align-items-center flex-row justify-content-start">
                  {/* Render Products Here */}
                  {this.renderProducts()}
                </div>
                <div className="d-flex flex-direction-row align-items-center justify-content-between mt-3">
                  <div className="col-4"></div>
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
                  <div className="col-4"></div>
                </div>
              </>
            )}
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
