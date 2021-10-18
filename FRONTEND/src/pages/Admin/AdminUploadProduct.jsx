import React from "react";
import Axios from "axios";
import { CustomInput } from 'reactstrap'

import "../../assets/styles/admin_upload_product.css";
import camera from "../../assets/images/admin/camera.png"

import { API_URL } from '../../constants/API'

class AdminUploadProduct extends React.Component {
    state = {
        namaObat: "",
        jumlahObat: Number,
        satuan: "ml",
        deskripsi: "",
        manfaat: "",
        komposisi: "",
        dosis: "",
        golongan: "",
        hargaPokok: Number,
        hargaJual: Number,
        fotoObat: "",
        dataFile: null,

        success: false,
        message: "",

        alertClass: ""
    }

    inputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }


    onBtnAddFile = (e) => {


        if (e.target.files[0]) {
            this.setState({ fotoObat: e.target.value, dataFile: e.target.files[0] })
            let preview = document.getElementById("imgPreview")
            preview.src = URL.createObjectURL(e.target.files[0])
        } else {
            // mengubah default value  dari image preview
            this.setState({ fotoObat: e.target.value, dataFile: null })
            let preview = document.getElementById("imgPreview")
            preview.src = camera
        }
    }


    btnSendData = () => {
        console.log(Boolean)
        if (this.state.namaObat && this.state.jumlahObat && this.state.deskripsi && this.state.manfaat && this.state.komposisi && this.state.dosis && this.state.golongan && this.state.hargaJual && this.state.hargaPokok && this.state.dataFile) {
            let formData = new FormData();

            let obj = {
                namaObat: this.state.namaObat,
                jumlahObat: parseFloat(this.state.jumlahObat),
                satuan: this.state.satuan,
                deskripsi: this.state.deskripsi,
                manfaat: this.state.manfaat,
                komposisi: this.state.komposisi,
                dosis: this.state.dosis,
                golongan: this.state.golongan,
                hargaPokok: this.state.hargaPokok,
                hargaJual: this.state.hargaJual,
            }

            formData.append('data', JSON.stringify(obj))
            formData.append('file', this.state.dataFile)
            Axios.post(`${API_URL}/admin/uploadDataProduct`, formData)
                .then((res) => {
                    this.setState({
                        namaObat: "",
                        jumlahObat: Number,
                        satuan: "ml",
                        deskripsi: "",
                        manfaat: "",
                        komposisi: "",
                        dosis: "",
                        golongan: "",
                        hargaPokok: Number,
                        hargaJual: Number,
                        fotoObat: "",
                        dataFile: null,

                        success: res.data.success,
                        message: res.data.message,
                    })

                    // mengembalikan default image 
                    let preview = document.getElementById("imgPreview")
                    preview.src = camera

                    // mengembailkan value image
                    let image = document.getElementById("image")
                    image.value = ""

                })
                .catch((err) => {
                    alert(`Terjadi kesalahan di server`)
                    console.log(err)
                })
        } else {
            alert(`Masukkan seluruh data`)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', (e) => {

            if (window.scrollY > 70) {
                this.setState({ alertClass: "alert-fixed" })
            } else {
                this.setState({ alertClass: "alert-absolute" })

            }
        })
    }

    render() {
        return (

            <div div className="position-relative d-flex justify-content-center align-items-center h-auto mt-5" >
                {
                    this.state.success == true ?
                        <div class={`alert alert-success alert-dismissible fade show text-center alert-response ${this.state.alertClass}`} role="alert" id="alert" >
                            <strong>{this.state.message}</strong>
                            <button type="button" class="close" onClick={() => this.setState({ success: false })} data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        :
                        null
                }
                <div className="border border-success h-75 w-50 px-5 py-2">
                    <div className="border-bottom border-success mb-3 text-center">
                        <h2 className="text-secondary">UPLOAD PRODUCT</h2>
                    </div>
                    <div className="h-75 w-100 d-flex flex-column ">
                        <div className="row mb-5">
                            {/* Nama Obat */}
                            <div className="col d-flex flex-column admin-upload-drug-name">
                                <label htmlFor="name" className="">Nama Obat</label>
                                <input type="text" name="namaObat" value={this.state.namaObat} onChange={this.inputHandler} className="input-data" placeholder="Nama Obat..." />
                            </div>

                            {/* Jumlah Obat */}
                            <div className="col d-flex flex-column  admin-upload-drug-quantity">
                                <label htmlFor="name" className="d-inline-block">Jumlah Satuan</label>
                                <div className="row">
                                    <input type="number" name="jumlahObat" value={this.state.jumlahObat} onChange={this.inputHandler} className="col-7 ml-3 p-0 input-data" placeholder="Jumlah..." />
                                    <div className="col-4">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="satuan" checked={this.state.satuan === "ml"} onChange={this.inputHandler} id="inlineRadio1" value="ml" />
                                            <label class="form-check-label" for="inlineRadio1">ml</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="satuan" checked={this.state.satuan === "botol"} onChange={this.inputHandler} id="inlineRadio2" value="botol" />
                                            <label class="form-check-label" for="inlineRadio2">Botol</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Harga */}
                        <div className="row admin-upload-price-category mb-5">
                            <div className="col admin-upload-price">
                                <p>Harga Pokok</p>
                                <p className="d-inline-block mr-2">Rp</p>
                                <input type="number" name="hargaPokok" value={this.state.hargaPokok} onChange={this.inputHandler} className="d-inline-block input-data" placeholder="0" />
                            </div>
                            <div className="col admin-upload-price">
                                <p>Harga Jual</p>
                                <p className="d-inline-block mr-2">Rp</p>
                                <input type="number" name="hargaJual" value={this.state.hargaJual} onChange={this.inputHandler} className="d-inline-block input-data" placeholder="0" />
                            </div>
                        </div>

                        {/* Golongan */}
                        <div className="admin-upload-category mb-5">
                            <p>Golongan</p>
                            <select name="golongan" value={this.state.golongan} onChange={this.inputHandler} className="input-data">
                                <option value="" selected disabled hidden>Pilih...</option>
                                <option value="Obat bebas terbatas">Obat bebas terbatas</option>
                                <option value="Obat bebas">Obat bebas</option>
                                <option value="Obat keras">Obat keras</option>
                                <option value="Obat wajib apotek">Obat wajib apotek</option>
                                <option value="Obat herbal">Obat herbal</option>
                            </select>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Deskripsi</label>
                                <textarea class="form-control" name="deskripsi" value={this.state.deskripsi} onChange={this.inputHandler} id="exampleFormControlTextarea1" rows="3" className="text-area"></textarea>
                            </div>
                        </div>

                        {/* Manfaat */}
                        <div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Manfaat</label>
                                <textarea class="form-control" name="manfaat" value={this.state.manfaat} onChange={this.inputHandler} id="exampleFormControlTextarea1" rows="3" className="text-area"></textarea>
                            </div>
                        </div>

                        {/* Komposisi */}
                        <div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Komposisi</label>
                                <textarea class="form-control" name="komposisi" value={this.state.komposisi} onChange={this.inputHandler} id="exampleFormControlTextarea1" rows="3" className="text-area"></textarea>
                            </div>
                        </div>

                        {/* Dosis */}
                        <div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Dosis</label>
                                <textarea class="form-control" name="dosis" value={this.state.dosis} onChange={this.inputHandler} id="exampleFormControlTextarea1" rows="3" className="text-area"></textarea>
                            </div>
                        </div>

                        {/* Gambar */}
                        <div className="row  h-100 admin-upload-image ">
                            <div className="col-4 d-flex flex-column justify-content-center">
                                <label htmlFor="" className="d-block">Pilih Gambar </label>
                                <input type="file" id="image" onChange={this.onBtnAddFile} className="input-file" />
                            </div>

                            <div className="col-8 d-flex align-items-center justify-content-center">
                                <img id="imgPreview" value="" src={camera} height="150" width="" alt="no image select" className={this.state.fotoObat == "" ? "no-img-selected" : null} />
                            </div>
                        </div>

                    </div>
                    <div className="mt-5">
                        <button type="button" onClick={this.btnSendData} class="btn btn-success">Buat</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default AdminUploadProduct