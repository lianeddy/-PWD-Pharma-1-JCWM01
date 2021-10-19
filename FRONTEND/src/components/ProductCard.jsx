import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/product_card.css";

class ProductCard extends React.Component {
  render() {
    return (
      <div className="card product-card">
        <img
          className="img-fluid"
          src={this.props.productData.foto_obat}
          alt=""
        />
        <div className="mt-2">
          <div>
            <h6 className="text-truncate mb-3">
              {this.props.productData.nama_obat}
            </h6>
            <div className="d-flex justify-content-center">
              <h6>
                Rp. {this.props.productData.harga} /{" "}
                {this.props.productData.satuan_jual}
              </h6>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between mx-auto">
            <div className="d-flex flex-row justify-content-between  mx-2 ">
              <a
                href={`/product-detail/${this.props.productData.idobat}`}
                className="btn btn-sm text-dark p-0"
              >
                <i className="fas fa-eye text-dark mr-1"></i>View Detail
              </a>
            </div>
            <button
              onClick={this.addToCartHandler}
              className="btn btn-primary btn-sm"
            >
              <i className="fas fa-shopping-cart text-dark mr-1 "></i> Add to
              cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductCard;
