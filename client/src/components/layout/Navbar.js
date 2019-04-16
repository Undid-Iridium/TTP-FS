import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {

  constructor (props) {
  super(props)
  this.state = { showbutton:  this.props.auth.isAuthenticated ? true : false }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({ showButton: this.props.auth.isAuthenticated })
  };
  
   handleChange(event) {
    this.setState({ showButtom : this.props.auth.isAuthenticated });
  }
  
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Home
            </Link>
            {this.props.auth.isAuthenticated ?
             <div className="rightAlign">
            <button ref = "but1"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              onChange= {this.handleChange}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            </div>
            : null }
            
          </div>
        </nav>
      </div>
    );
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
