import React from "react";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {


  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="card product-item border-0 mb-4">
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img
              className="img-fluid"
              src={this.props.productData.foto_obat}
              alt=""
            />
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">
              {this.props.productData.nama_obat}
            </h6>
            <div className="d-flex justify-content-center">
              <h6>Rp. {this.props.productData.harga_jual}</h6>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            <Link
              to={`/product-detail/${this.props.productData.idobat}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <a href="" className="btn btn-sm text-dark p-0">
                <i className="fas fa-eye text-primary mr-1"></i>View Detail
              </a>
            </Link>
            <a href="" className="btn btn-sm text-dark p-0">
              <i className="fas fa-shopping-cart text-primary mr-1"></i>
              Add To Cart
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductCard;
