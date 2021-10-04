import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Register extends React.Component {
  onBtAdd = () => {
    Axios.post("http://localhost:3300/add-user", {
      nama_depan: this.nama_depan.value,
      nama_belakang: this.nama_belakang.value,
      jenis_kelamin: this.jenis_kelamin.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Daftarkan diri anda!</h1>
            <p className="lead">
              Daftar sekarang dan dapatkan pilihan obat yang lengkap serta
              terjangkau
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Register</h5>
                <input
                  name="nama_depan"
                  placeholder="Nama Depan"
                  type="text"
                  className="form-control my-2"
                  ref={(nama_depan) => (this.nama_depan = nama_depan)}
                />
                <input
                  name="nama_belakang"
                  placeholder="Nama Belakang"
                  type="text"
                  className="form-control my-2"
                  ref={(nama_belakang) => (this.nama_belakang = nama_belakang)}
                />
                <input
                  name="jenis_kelamin"
                  placeholder="Jenis Kelamin"
                  type="text"
                  className="form-control my-2"
                  ref={(jenis_kelamin) => (this.jenis_kelamin = jenis_kelamin)}
                />

                <input
                  name="username"
                  placeholder="Username"
                  type="text"
                  className="form-control my-2"
                  ref={(username) => (this.username = username)}
                />
                <input
                  name="email"
                  placeholder="E-mail"
                  type="text"
                  className="form-control my-2"
                  ref={(email) => (this.email = email)}
                />
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                  ref={(password) => (this.password = password)}
                />
                <div
                  className="d-flex flex-row justify-content-between align-items-center"
                  onClick={this.onBtAdd}
                >
                  <button className="btn btn-primary mt-2">Daftar</button>
                  <Link to="/login" className="text-decoration-none">
                    Atau Masuk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
