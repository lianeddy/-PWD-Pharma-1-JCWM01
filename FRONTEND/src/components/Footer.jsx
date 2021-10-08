import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className=" bg-warning bg-gradient">
        <footer className="container py-5">
          <div className="row">
            <div className="col-12 col-md">
              <h4>AMR Pharmacy</h4>
              <small>Copyright 2021</small>
            </div>
            <div className="col-6 col-md">
              <h5>Tentang</h5>
              <ul className="list-unstyled text-small ">
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Ketentuan Penggunaan
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Ketentuan Layanan
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Promo dan Tips Sehat
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    List Apotek
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Pengguna</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a
                    className="text-muted text-decoration-none text-decoration-none"
                    href="/register"
                  >
                    Daftar
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="/login">
                    Masuk
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Konfirmasi Pembayaran
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Lacak Pembelian
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Permintaan Produk
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Layanan Pelanggan</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Cara Pembelian
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Ketentuan Transaksi
                  </a>
                </li>
                <li>
                  <a className="text-muted text-decoration-none" href="#">
                    Ada Pertanyaan? Hubungi kami di Live Chat (24 jam)
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Ikuti Kami</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a
                    className="fab fa-instagram text-decoration-none text-dark"
                    href="https://www.instagram.com/"
                  ></a>
                </li>
                <li>
                  <a
                    className="fab fa-facebook text-decoration-none text-dark"
                    href="#"
                  ></a>
                </li>
                <li>
                  <a
                    className="fab fa-twitter text-decoration-none text-dark"
                    href="#"
                  ></a>
                </li>
                <li>
                  <a
                    className="fab fa-youtube text-decoration-none text-dark"
                    href="#"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
