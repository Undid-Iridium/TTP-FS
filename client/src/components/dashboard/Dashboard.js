import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.css";
class Dashboard extends Component {
 

  render() {
    const { user } = this.props.auth;
   
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into your dashboard!{" "}
                <span style={{ fontFamily: "monospace" }}>StockTTP</span>  App 👏
              </p>
            </h4>
            
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Dashboard);

//Can use this page to show summary of stocks
