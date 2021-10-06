import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-12 text-center ">
              <h1>Masuk ke AMR Pharmacy</h1>
              <p className="lead">
                Masuk sekarang dan temukan obat kebutuhan anda
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4 offset-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bold mb-3">Masuk</h5>
                  <input
                    name="username"
                    placeholder="Username"
                    type="text"
                    className="form-control my-2"
                  />
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="form-control my-2"
                  />
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button className="btn btn-primary mt-2">Masuk</button>
                    <Link to="/register" className="text-decoration-none">
                      Daftar
                    </Link>
                  </div>
                  <div className="my-3">

                  <Link to="/forgot" className="text-decoration-none">
                      <p>Lupa password ?</p>
                    </Link>
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

export default Login;
