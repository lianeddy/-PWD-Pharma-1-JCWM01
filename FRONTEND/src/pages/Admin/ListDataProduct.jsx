import React from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/API"


class ListDataProduct extends React.Component {
    state = {
        productList: []
    }

    fetchDataProduct = () => {
        Axios.get(`${API_URL}/admin/getDataProduct`)
            .then(result => {
                this.setState({ productList: result.data })
                console.log(this.state.productList)
            })
            .catch(err => {
                console.log(err)
                alert(`Terjadi keslahan di server`)
            })
    }

    renderDataProduct = () => {
        let no = 1
        return this.state.productList.map(val => {
            return (
                <tr>
                    <th scope="row">{no++}</th>
                    <td>{val.nama_obat}</td>
                    <td>{val.jumlah_obat}</td>
                    <td>{val.satuan}</td>
                    <td>
                        <Link to={`/admin-edit-product/${val.id_obat}`}>Edit</Link>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.fetchDataProduct()
    }

    render() {
        return (

            <div>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama Obat</th>
                            <th scope="col">Jumlah Tersedia</th>
                            <th scope="col">Satuan</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataProduct()}
                    </tbody >

                </table >
            </div>
        )
    }
}

export default ListDataProduct;
