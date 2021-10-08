import React from "react";
import { Link } from "react-router-dom";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="container rounded bg-light">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle"
                width="150px"
                src="https://pbs.twimg.com/profile_images/874944604423847936/v29ClnPg_400x400.jpg"
              />
              <span className="font-weight-bold">Ryan Dwiky</span>
              <span className="text-black-50">dwikyryan@gmail.com</span>
              <span>
                <button className="btn btn-sm btn-warning mt-2" type="button">
                  <Link
                    to="/edit-profile"
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                  >
                    Edit Profil
                  </Link>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profil Anda</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="labels">Nama Depan</h6>
                  <p>Ryan</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">Nama Belakang</h6>
                  <p>Dwiky</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="labels">Username</h6>
                  <p>dwikyryan</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">E-mail</h6>
                  <p>dwikyryan@gmail.com</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">Jenis Kelamin</h6>
                  <p>Pria</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">Tanggal Lahir</h6>
                  <p>1992-03-13</p>
                </div>
                <div className="col-md-12 mt-2">
                  <h6 className="labels">Alamat Pengiriman</h6>
                  <p>Jl. Pancoran Barat II No.6, Jakarta Selatan</p>
                </div>
                <div className="col-md-12 mt-2">
                  <h6 className="labels">Kode Pos</h6>
                  <p>12780</p>
                </div>
                <div className="mt-4 text-center">
                  <h6>
                    <a
                      href="/"
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Kembali ke Home
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
