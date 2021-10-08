import React from "react";

class Forgot extends React.Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-12 text-center ">
              <h1>Find your account</h1>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4 offset-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bold mb-3">Enter your email</h5>
                  <input
                    name="Email"
                    placeholder="E-mail"
                    type="text"
                    className="form-control my-2"
                  />
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button className="btn btn-primary mt-2">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forgot;
