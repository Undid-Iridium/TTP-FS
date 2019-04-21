import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import "../../App.css";
import mainLogo from "../../interlaced.png";
import PropTypes from "prop-types";
import Table1 from "../layout/Table";

function findElement(arr, propName, propValue) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i][propName] == propValue) return arr[i];

  // will return undefined if not found; you could return a default instead   backgroundSize: 'cover',
}

const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${mainLogo})`,
  
  backgroundrepeat: 'repeat'
};



var data = [
  { text: "AAA", value: 1, valuetotal: "0" },
  { text: "BBB", value: 2, valuetotal: "1" },
  { text: "CCC", value: 3, valuetotal: "2" }
];
class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      Ticker: "",
      Quantity: Number,
      Total : 0,
      size: 3,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    var totalP =
      findElement(data, "text", this.state.Ticker).value * this.state.Quantity;
    console.log("totalP :   " + totalP);
    const stockPurchase = {
      Ticker: this.state.Ticker,
      Quantity: this.state.Quantity,
      Value: totalP
    };
    console.log("Stock Purchase", stockPurchase);
  };

  validateForm() {
    return this.state.Quantity > 0 && this.state.Ticker.length > 0;
  }

  render() {
    //https://codesandbox.io/s/2omrn3oq30 https://www.npmjs.com/package/react-table

    const { user } = this.props.auth;
    //console.log(user);
    const { errors } = this.state;
    return (
    
      <div style = {divStyle}>
      
        <div className="portfolio">
          <div className="itemBoxLeft even">
            <div className="separateScreenLeft">
             <div className = "childFont">
              <p
                style={
                  (
                 
                  { textAlign: "left" })
                }
              >
                Portfolio: (${this.state.Total}){" "}
              </p>
              </div>
              <Table1 data={data} />
            </div>
          </div>
          <div className="itemBoxRight odd">
            <div className="rightAlignSpec">
              <div className="separateScreenRight">
                {this.props.auth.isAuthenticated ? (
                  <div className="centerAlign">
                    <div className="divBox">
                      <p style={({ color: "#2d2d2d" }, { fontSize: 20 })}>
                        {" "}
                        Account Balance: ${user.balance}{" "}
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
                      {errors.Tickernotfound}
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
                    <div className="centerAlign">
                      <button
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3 "
                        disabled={!this.validateForm()}
                      >
                        Buy
                      </button>
                    </div>
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
        <div className="clr"></div> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Portfolio);

//https://api.iextrading.com/1.0/stock/aapl/chart
//https://iextrading.com/developer/docs/#chart
//https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=1
//https://iextrading.com/developer/docs/#batch-requests

