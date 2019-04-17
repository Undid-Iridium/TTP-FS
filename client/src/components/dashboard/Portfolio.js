import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import "../../App.css";
import PropTypes from "prop-types";
import Table1 from "../layout/Table";
class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      Ticker: "",
      Quantity: 0,
      size: 3,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const stockPurchase = {
      Ticker: this.state.Ticker,
      Quantity: this.state.Quantity
    };
  };

  render() {
    //https://codesandbox.io/s/2omrn3oq30 https://www.npmjs.com/package/react-table
    var data = [
      { text: "AAA", value: 1, valuetotal: "20" },
      { text: "BBB", value: 2, valuetotal: "53" },
      { text: "CCC", value: 3, valuetotal: "42" }
    ];
    const { user } = this.props.auth;
    console.log(user);
    const { errors } = this.state;
    return (
    <div>
        <div className='portfolio'>
            <div className='itemBoxLeft even'>
                <div className = "separateScreenLeft">
            <p className="Table-header">Basic Table</p>
            <Table1 data={data} />
          </div>
            </div>                    
            <div className='itemBoxRight odd'>    
                <div className="rightAlignSpec">
          <div className="separateScreenRight">
            {this.props.auth.isAuthenticated ? (
              <div className="centerAlign">
                <div className="divBox">
                  <p style={({ color: "#2d2d2d" }, { fontSize: 20 })}>
                    {" "}
                    Account Balance: {user.balance}{" "}
                  </p>
                </div>
              </div>
            ) : null}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Ticker}
                  error={errors.Ticker}
                  id="Ticker"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Ticker || errors.Tickernotfound
                  })}
                />
                <label htmlFor="Ticker">Ticker</label>
                <span className="red-text">
                  {errors.Ticker}
                  {errors.Ticker}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Quantity}
                  error={errors.Quantity}
                  id="Quantity"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Quantity || errors.QuantityExceeds
                  })}
                />
                <label htmlFor="Quantity">Quantity</label>
                <span className="red-text">
                  {errors.Quantity}
                  {errors.QuantityExceeds}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Buy
                </button>
              </div>
            </form>
          </div>
        </div>
            </div>

         </div>
    
        <p id="footer">
          {" "}
          Data provided for free by IEX. View IEX’s Terms of Use.{" "}
        </p>
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Portfolio);

//https://api.iextrading.com/1.0/stock/aapl/chart
//https://iextrading.com/developer/docs/#chart
//https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=1
//https://iextrading.com/developer/docs/#batch-requests

