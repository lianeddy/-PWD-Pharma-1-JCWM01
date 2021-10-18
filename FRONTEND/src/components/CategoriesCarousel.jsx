import React from "react";
import { connect } from "react-redux";
import Carousel from "./Carousel";

class CategoriesCarousel extends React.Component {
  render() {
    return (
      <div className="container-fluid my-3 bg-light">
        <div className="row border-bottom px-xl-5">
          <div className="col-lg-3 d-none d-lg-block position-relative overflow-hidden">
            <div className="mb-5" style={{ height: "200px" }}>
              <img
                className="img-fluid"
                src="https://images.newscientist.com/wp-content/uploads/2019/06/18153152/medicineshutterstock_1421041688.jpg"
                alt=""
              />
            </div>
            <div className="pt-4" style={{ height: "200px" }}>
              <img
                className="img-fluid"
                src="https://www.nps.org.au/assets/GettyImages-862433964.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-9">
            <Carousel />
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

export default connect(mapStateToProps)(CategoriesCarousel);
