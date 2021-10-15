import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { API_URL } from "../../constants/API"

// style
import "../../assets/styles/admin_list_data_product.css"


class ListDataProduct extends React.Component {
    state = {
        productList: [],
        page: 1,
        itemPerPage: 10,
        maxPage: 0,

        alertDelete: true
    }

    fetchDataProduct = (page = 1) => {
        Axios.get(`${API_URL}/admin/getDataProduct`, {
            params: {
                page,
                itemPerPage: this.state.itemPerPage
            }
        })
            .then(result => {
                this.setState({ productList: result.data.result, maxPage: Math.ceil(result.data.count[0].max / this.state.itemPerPage) })
            })
            .catch(err => {
                alert(`Terjadi keslahan di server`)
            })
    }

    // alertDelete = () => {
    //     return (
    //         this.alertDelete :

    //     )
    // }

    deleteProduct = (id) => {
        let hapus = window.confirm(`Yakin menghapus data ?`)
        if (hapus) {
            Axios.delete(`${API_URL}/admin/deleteProduct/${id}`)
                .then(res => {
                    alert(`Data berhasil di hapus`)
                    this.fetchDataProduct()
                })
                .catch(err => {
                    alert(`Terjadi kesalahan di server`)
                })
        }

    }

    renderDataProduct = () => {
        let no = (this.state.itemPerPage * (this.state.page - 1)) + 1
        return this.state.productList.map(val => {
            return (
                <tr className="text-center">
                    <th className="text-center no-table">{no++}</th>
                    <td >{val.nama_obat}</td>
                    <td>{val.jumlah_obat}</td>
                    <td>{val.satuan}</td>
                    <td>{val.harga_pokok}</td>
                    <td>{val.harga_jual}</td>
                    <td>
                        <img src={`${API_URL}${val.foto_obat}`} width="100" alt="" />
                    </td>
                    <td>
                        <Link to={`/admin-edit-product/${val.id_obat}`}>Edit</Link>
                        <a onClick={() => this.deleteProduct(val.id_obat)} className="text-danger ms-2" role="button">Delete</a>
                    </td>
                </tr>
            )
        })
    }

    nextPageHandler = () => {
        if (this.state.page < this.state.maxPage) {
            this.setState({ page: this.state.page + 1 });
            let page = this.state.page + 1
            this.fetchDataProduct(page)
        }
    };

    prevPageHandler = () => {
        if (this.state.page > 1) {
            this.setState({ page: this.state.page - 1 });
            let page = this.state.page - 1
            this.fetchDataProduct(page)
        }
    };

    componentDidMount() {
        this.fetchDataProduct()
    }

  fetchDataProduct = () => {
    Axios.get(`${API_URL}/admin/getDataProduct`)
      .then((result) => {
        this.setState({ productList: result.data });
        console.log(this.state.productList);
      })
      .catch((err) => {
        console.log(err);
        alert(`Terjadi keslahan di server`);
      });
  };

  renderDataProduct = () => {
    let no = 1;
    return this.state.productList.map((val) => {
      return (
        <tr>
          <th scope="row">{no++}</th>
          <td>{val.nama_obat}</td>
          <td>{val.satuan_jual}</td>
          <td>{val.golongan}</td>
          <td>{val.stock}</td>
          <td>{val.harga}</td>
          <td>
            <Link to={`/admin-edit-product/${val.id_obat}`}>Edit</Link>
          </td>
        </tr>
      );
    });
  };

                {/* <table class="table table-striped"> */}
                <Table striped >
                    <thead>
                        <tr className="text-center">
                            <th className="no-table">No</th>
                            <th>Nama Obat</th>
                            <th>Jumlah Tersedia</th>
                            <th>Satuan</th>
                            <th>Harga Pokok</th>
                            <th>Harga Jual</th>
                            <th>Gambar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataProduct()}
                    </tbody >



                    {/* </table > */}
                </Table>
                <div className="d-flex my-5 flex-row justify-content-start align-items-center pagination">
                    <button
                        disabled={this.state.page === 1}
                        onClick={this.prevPageHandler}
                        className="btn btn-info"
                    >
                        {"<"}
                    </button>
                    <div className="text-center px-5">
                        Page {this.state.page} of {this.state.maxPage}{" "}
                    </div>
                    <button onClick={this.nextPageHandler} className="btn btn-info">
                        {">"}
                    </button>
                </div>
            </div>
        )
    }
}

export default ListDataProduct;
