import React from "react";
import { Link } from "react-router-dom";

class EditProfile extends React.Component {
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
              <span>
                {" "}
                <button className="btn btn-sm btn-secondary mt-2" type="button">
                  <Link
                    to="/edit-profile"
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Ganti Foto
                  </Link>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Profil</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nama Depan</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ryan"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Nama Belakang</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dwiky"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="dwikyryan"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">E-mail</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="dwikyryan@gmail.com"
                  />
                </div>

                <div className="col-md-6 mt-3">
                  <label className="labels">Jenis Kelamin</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pria"
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="labels">Tanggal Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1992-03-13"
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Alamat Pengiriman</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Jl. Pancoran Barat 2 No.6, Jakarta Selatan"
                  />
                </div>
                <div className="col-md-3 mt-2">
                  <label className="labels">Kode Pos</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="12780"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  className="btn btn-primary profile-button mx-2"
                  type="button"
                >
                  Simpan
                </button>
                <button className="btn btn-danger profile-button" type="button">
                  <Link
                    to="/profile-page"
                    style={{ textDecoration: "none" }}
                    className="text-white"
                  >
                    Batal
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
