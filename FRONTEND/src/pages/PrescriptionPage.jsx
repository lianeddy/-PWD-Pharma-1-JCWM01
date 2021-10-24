import React from "react";
import { CustomInput, FormGroup, Button } from "reactstrap";
import "../assets/styles/prescriptions.css";
import camera from "../assets/images/admin/camera.png";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { connect } from "react-redux";

class PrescriptionPage extends React.Component {
  state = {
    fotoObat: "",
    dataFile: null,
  };

  onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      this.setState({ fotoObat: e.target.value, dataFile: e.target.files[0] });
      let preview = document.getElementById("imgPreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    } else {
      // mengubah default value  dari image preview
      this.setState({ fotoObat: e.target.value, dataFile: null });
      let preview = document.getElementById("imgPreview");
      preview.src = camera;
    }
  };

  btnSendData = () => {
    if (this.state.dataFile) {
      let formData = new FormData();
      formData.append("file", this.state.dataFile);
      Axios.post(
        `${API_URL}/user/upload-prescriptions/${this.props.userGlobal.id_user}`,
        formData
      )
        .then((res) => {
          this.setState({
            fotoObat: "",
            dataFile: null,
          });
          // mengembalikan default image
          let preview = document.getElementById("imgPreview");
          preview.src = camera;

          alert(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 700);
        })
        .catch((err) => {
          alert(`Terjadi kesalahan di server`);
          console.log(err);
        });
    } else {
      alert(`Masukkan seluruh data`);
    }
  };

  render() {
    if (this.props.userGlobal.id_user) {
      return (
        <div className="container py-1">
          <header className="text-dark text-center">
            <h1 className="display-4">Kirim Resep disini</h1>
            <p className="mb-5 font-weight-light">
              Upload foto resep pada form di bawah untuk melakukan permintaan
              resep
            </p>
            <div className="d-flex justify-content-center">
              <TransformWrapper>
                <React.Fragment>
                  <TransformComponent>
                    <img
                      id="imgPreview"
                      value=""
                      src={camera}
                      height="350"
                      width=""
                      alt="no image select"
                      className={
                        this.state.fotoObat === ""
                          ? "no-img-selected border border-success"
                          : null
                      }
                    />
                  </TransformComponent>
                </React.Fragment>
              </TransformWrapper>
            </div>
            <div className="row py-4">
              <div className="mx-auto">
                <FormGroup className="w-100">
                  <CustomInput
                    type="file"
                    id="image"
                    name="inputFile"
                    onChange={this.onBtnAddFile}
                  />
                </FormGroup>
                <Button
                  color="success"
                  className="align-self-start mt-5"
                  onClick={this.btnSendData}
                >
                  KIRIM
                </Button>
              </div>
            </div>
          </header>
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

export default connect(mapStateToProps)(PrescriptionPage);
