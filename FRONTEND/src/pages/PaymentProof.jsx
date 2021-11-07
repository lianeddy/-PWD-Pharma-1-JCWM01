import React from "react";

class PaymentProof extends React.Component {
  render() {
    return (
      <div className="container rounded bg-light my-5">
        <div className="row">
          <div className="border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                id="imgpreview"
                className="img-fluid"
                width="300px"
                src="http://blog.themexpose.com/wp-content/uploads/2018/06/ahrink.com-payment-proof.png"
                alt=""
              />
              <div class="form-group mx-auto text-center align-items-center mt-2">
                <label className="font-weight-medium">
                  Unggah bukti transfer pada form di bawah
                </label>
                <input type="file" className="form-control mt-2" id="img" />
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-lg btn-primary">Unggah</button>
                <button className="btn btn-lg btn-danger mx-2">Batal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentProof;
