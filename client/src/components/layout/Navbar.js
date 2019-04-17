import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "../../App.css";

class NavbarTool extends Component {
  constructor(props) {
    super(props);
    this.state = { showbutton: this.props.auth.isAuthenticated ? true : false };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({ showButton: this.props.auth.isAuthenticated });
  };

  handleChange(event) {
    this.setState({ showButtom: this.props.auth.isAuthenticated });
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="nav-wrapper white">
            <Link
              to={this.props.auth.isAuthenticated ? "/dashboard" : "/"}
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Home
            </Link>

            {this.props.auth.isAuthenticated ? (
              <div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link
                        to="/portfolio"
                        style={{
                          fontFamily: "monospace"
                        }}
                        className="col s5   black-text"
                      >
                        Portfolio
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/transactions"
                        style={{
                          fontFamily: "monospace"
                        }}
                        className="col s5   black-text"
                      >
                        Transactions
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rightAlign">
                  <button
                    ref="but1"
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: ".35rem"
                    }}
                    onClick={this.onLogoutClick}
                    onChange={this.handleChange}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    );
  }
}

NavbarTool.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarTool);
