import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userKeepLogin } from "../redux/actions/user";
import Axios from "axios";
import { API_URL } from "../constants/API";

class EditProfilePicture extends React.Component {
  state = {
    userData: {},
    editUser: 0,
    edit_foto_profil: "",
    edit_success: false,
  };
  fetchUserData = () => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        id_user: this.props.userGlobal.id_user,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({
            userData: result.data[0],
            editUser: result.data[0].id_user,
            edit_foto_profil: result.data[0].foto_profil,
          });
        } else {
          this.setState({ userNotFound: true });
        }
      })
      .catch(() => {
        alert(`Kesalahan saat mengambil data user`);
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onBtAddFile = (e) => {
    if (e.target.files[0]) {
      this.setState({
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  saveBtn = () => {
    if (this.state.addFile) {
      let formData = new FormData();

      formData.append("file", this.state.addFile);
      Axios.patch(`${API_URL}/picture/upload/${this.state.editUser}`, formData)
        .then((res) => {
          alert(res.data.message);
          this.setState({ edit_success: true });
        })
        .catch((err) => {
          alert("Gagal upload foto");
          console.log(err);
        });
    }
  };

  cancelPictureBtn = () => {
    this.setState({ edit_success: true });
  };

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    if (this.state.edit_success === true) {
      return <Redirect to={`/profile-page/${this.state.editUser}`} />;
    } else if (this.props.userGlobal.id_user) {
      return (
        <div className="container rounded bg-light">
          <div className="row">
            <div className="border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  id="imgpreview"
                  className="img-fluid"
                  width="700px"
                  src={`${API_URL}/${this.state.edit_foto_profil}`}
                  alt=""
                />
                <div class="form-group mx-auto text-center align-items-center mt-2">
                  <label className="font-weight-medium">
                    Unggah foto baru pada form di bawah
                  </label>
                  <input
                    type="file"
                    className="form-control mt-2"
                    id="img"
                    onChange={this.onBtAddFile}
                  />
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={this.saveBtn}
                    className="btn btn-lg btn-primary"
                  >
                    Looks Good!
                  </button>
                  <button
                    onClick={this.cancelPictureBtn}
                    className="btn btn-lg btn-danger mx-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePicture);
