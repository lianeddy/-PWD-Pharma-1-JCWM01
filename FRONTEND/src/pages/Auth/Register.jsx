import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "laki-laki",

    alertPassword: false,
    alertEmail: false,
    btnSendDisabled: true,

    messages: "",
    alert: "",
    registered: true,
    redirect: false,
    tanggal_lahir: "",
    email: "",
    password: "",
    konfirmasi_password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    // kondisi untuk disabled tombol kirim
    if (
      this.state.nama_depan &&
      this.state.nama_belakang &&
      this.state.email &&
      this.state.password
    ) {
      console.log("Masuk1");
      if (value.length > 0) {
        console.log("Masuk2");
        this.setState({ btnSendDisabled: false });
      } else {
        this.setState({ btnSendDisabled: true });
      }
    } else {
      this.setState({ btnSendDisabled: true });
    }

    // kondisi untuk password
    if (name === "password" && value.length < 9) {
      this.setState({ alertPassword: true, btnSendDisabled: true });
    } else {
      this.setState({ alertPassword: false });
    }

    // kondisi untuk email
    let filter =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email" && !filter.test(value)) {
      this.setState({ alertEmail: true, btnSendDisabled: true });
    } else {
      this.setState({ alertEmail: false });
    }

    if (name !== "password" || name !== "email")
      this.setState({ [name]: value });
  };

  registerHandler = () => {
    if (
      this.state.nama_depan &&
      this.state.nama_belakang &&
      this.state.email &&
      this.state.password
    ) {
      const { nama_depan, nama_belakang, jenis_kelamin, email, password } =
        this.state;
      Axios.post(`${API_URL}/user/add-user`, {
        nama_depan,
        nama_belakang,
        jenis_kelamin,
        email,
        password,
        status: "UNVERIFIED",
        role: "USER",
      })
        .then((res) => {
          this.setState({
            messages: res.data.messages,
            registered: res.data.registered,
            alert: res.data.alert,
          });
          setTimeout(() => {
            // menjalankan redirect ke page login jika user berhasil terdaftar
            this.setState({ redirect: res.data.redirect });

            // mematikan alert untuk username atau email telah terpakai
            this.setState({ registered: false });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Masukkan data dengan benar");
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.registered ? (
          <div>
            <div
              class={`alert postion-absolute ${this.state.alert}`}
              role="alert"
            >
              {this.state.messages}
            </div>
            {this.state.redirect ? <Redirect to="/login" /> : null}
          </div>
        ) : null}
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
            {this.props.userGlobal.errMsg ? (
              <div className="alert alert-danger">
                {this.props.userGlobal.errMsg}
              </div>
            ) : null}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3 text-center">Register</h5>
                <input
                  name="nama_depan"
                  onChange={this.inputHandler}
                  placeholder="Nama Depan"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  name="nama_belakang"
                  onChange={this.inputHandler}
                  placeholder="Nama Belakang"
                  type="text"
                  className="form-control my-2"
                />
                <div>
                  <label htmlFor="">Jenis Kelamin</label>
                  <div className="d-flex">
                    <div class="form-check mr-5">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="jenis_kelamin"
                        id="laki-laki"
                        value="laki-laki"
                        onClick={this.inputHandler}
                        checked={this.state.jenis_kelamin === "laki-laki"}
                      />
                      <label class="form-check-label" for="laki-laki">
                        Laki-laki
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="jenis_kelamin"
                        value="perempuan"
                        onClick={this.inputHandler}
                        id="perempuan"
                      />
                      <label class="form-check-label" for="perempuan">
                        Perempuan
                      </label>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <input
                    name="email"
                    onChange={this.inputHandler}
                    placeholder="E-mail"
                    type="email"
                    className="form-control my-2"
                  />
                  {this.state.alertEmail ? (
                    <div
                      class="alert alert-warning position-absolute top-0 start-100 w-100"
                      role="alert"
                    >
                      Email harus benar
                    </div>
                  ) : null}
                </div>

                <div className="position-relative">
                  <input
                    name="password"
                    onChange={this.inputHandler}
                    placeholder="Password"
                    type="password"
                    className="form-control my-2"
                  />
                  {this.state.alertPassword ? (
                    <div
                      class="alert alert-warning position-absolute top-0 start-100 w-100"
                      role="alert"
                    >
                      password harus lebih dari 8 karakter
                    </div>
                  ) : null}
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={this.registerHandler}
                    className="btn btn-primary mt-2"
                    disabled={this.state.btnSendDisabled}
                  >
                    Daftar
                  </button>
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

const mapStateToProps = (state) => {
  return { userGlobal: state.user };
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
