import React from "react";

class PrescriptionPage extends React.Component {
  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">KIRIM RESEP DI SINI</h3>
          </div>
        </header>
        <main role="main" className="inner-cover">
          <h1 className="cover-heading">UPLOAD RESEP DOKTER</h1>
          <p className="lead">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
            magni! Sapiente, explicabo.
          </p>
          <p className="lead">
            <a href="">UPLOAD RESEP</a>
          </p>
        </main>
      </div>
    );
  }
}

export default PrescriptionPage;
