import React from "react";
import { BrowserRouter, Switch, Route, Link, StaticRouter } from 'react-router-dom'
import { Redirect } from "react-router";
import ListDataProduct from "./Admin/ListDataProduct";
import { connect } from "react-redux";


class Admin extends React.Component {

  state = {

  }
  componentDidMount() {
    console.log('role', this.props.userGlobal.role)
  }
  render() {

    if (this.props.userGlobal.role !== "ADMIN") {
      return <Redirect to="/" />

    }
    return (

      <div className=" row h-auto w-100 border-bottom">
        <div className="col-2 border-right">
          <h4 className="mb-5">ADMIN PAGE</h4>

          <div className="d-flex flex-column">


            <Link to={'/admin-upload-product'}><button type="button" class="btn btn-success mb-2 w-100"> <i class="fa fa-upload" aria-hidden="true"></i> Upload data</button></Link>
            <Link to={'/admin/list-data-product'}> <button type="button" class="btn btn-success w-100"><i class="fa fa-database" aria-hidden="true"></i> List</button></Link>

          </div>
        </div>

        <div className="col-10 ">
          <Switch>
            <Route path='/admin/list-data-product' component={ListDataProduct} />
          </Switch>
        </div>


      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return { userGlobal: state.user };
};

export default connect(mapStateToProps)(Admin);

