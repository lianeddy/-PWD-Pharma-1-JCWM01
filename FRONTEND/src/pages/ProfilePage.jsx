import React from "react";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="container rounded bg-white">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://pbs.twimg.com/profile_images/874944604423847936/v29ClnPg_400x400.jpg"
              />
              <span className="font-weight-bold">Ryan Dwiky</span>
              <span className="text-black-50">dwikyryan@gmail.com</span>
              <span> </span>
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
                    placeholder="Nama Depan"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Nama Belakang</label>
                  <input
                    type="text"
                    className="form-control"
                    value=""
                    placeholder="Nama Belakang"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value=""
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">E-mail</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    value=""
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Jenis Kelamin</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Jenis Kelamin"
                    value=""
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Alamat Pengiriman</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat Pengiriman"
                    value=""
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Kode Pos</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kode Pos"
                    value=""
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Tanggal Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tanggal Lahir"
                    value=""
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
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
