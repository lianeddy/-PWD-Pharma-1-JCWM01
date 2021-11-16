import React from "react";
import { API_URL } from "../constants/API";
import Axios from "axios";

class SearchBar extends React.Component {
  state = {
    drugList: [],
    searchDrug: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  searchDrugList = () => {
    if (this.state.searchDrug !== "") {
      Axios.get(`${API_URL}/obat/search-drug`, {
        params: {
          nama_obat: this.state.searchDrug,
        },
      })
        .then((result) => {
          this.setState({ drugList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ drugList: [] });
    }
  };

  renderSearchList = () => {
    return this.state.drugList.slice(0, 5).map((val) => {
      return (
        <tr>
          <td className="align-middle" style={{ width: "500px" }}>
            <img src={val.foto_obat} alt="" style={{ width: "50px" }} />
            <a
              className="text-decoration-none text-dark"
              href={`/product-detail/${val.idobat}`}
            >
              {val.nama_obat}
            </a>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.searchDrugList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchDrug !== this.state.searchDrug) {
      return this.searchDrugList();
    }
  }

  render() {
    return (
      <form className="flex-column form-group justify-content-center">
        <input
          onChange={this.inputHandler}
          type="text"
          name="searchDrug"
          value={this.state.searchDrug}
          className="form-control"
          placeholder="Temukan obat..."
          style={{ width: "500px" }}
        />
        <div
          style={{
            width: "500px",
            backgroundColor: "white",
          }}
          className="position-absolute"
        >
          {this.renderSearchList()}
        </div>
      </form>
    );
  }
}

export default SearchBar;
