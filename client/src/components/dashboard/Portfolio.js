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

function isInt(n){
    return n % 1 === 0;
}

function typeOf(obj) {
  return {}.toString
    .call(obj)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}

const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${mainLogo})`,

  backgroundrepeat: "repeat"
};

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      Ticker: "",
      Quantity: Number,
      Total: 0,
      size: 3,
      errors: {},
      data: []
    };
  }
  async componentDidMount() { 
    //const data = await  axios.get('https://api.iextrading.com/1.0/ref-data/symbols').then(function (response) { console.log(response); return response;}).catch(error => console.log(error));
    const { user } = this.props.auth;
    var stockObj = [];
    
    for (var item of user.stocks) {
        
         var symbol = item.Ticker;
         var link = "https://api.iextrading.com/1.0/stock/" + symbol + "/price";
         fetch(link)
         .then(objOri => objOri.json())
         .then(objData => {
           var itemValue = (item.Amount <= 0 ? 1 : item.Amount) ;
           itemValue *= objData;
           stockObj.push( { Ticker : symbol, Amount : item.Amount, Total : itemValue});
            
           this.setState({ data : stockObj, Total : this.state.Total + itemValue});
         })
         .catch(err => {
            console.log(err);
         });
    }
    
   
    //console.log("AAA" , stockObj);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
    var totalP = 
    findElement(this.state.data, "Ticker", this.state.Ticker).Total;
    
 
    console.log("totalP :   " + totalP);
    const stockPurchase = {
      Ticker: this.state.Ticker,
      Quantity: this.state.Quantity,
      Value: totalP
    };
    var symbol = this.state.Ticker;
    var link = "https://api.iextrading.com/1.0/stock/" + symbol + "/price";
    fetch(link)
         .then(objOri => objOri.json())
         .then(objData => {
              return true;
         }).catch(err => { return false;});
    console.log("Stock Purchase", stockPurchase);
  };

   validateForm() {
    var confirm = false;
    confirm = (this.state.Quantity > 0 && this.state.Ticker.length > 0)  && isInt(this.state.Quantity);
    confirm = isInt(this.state.Quantity);

    return confirm;
  }

  render() {
    //https://codesandbox.io/s/2omrn3oq30 https://www.npmjs.com/package/react-table

    const { user } = this.props.auth;
    //console.log(this.state.data);
    const { errors } = this.state;
    return (
      <div style={divStyle}>
        <div className="portfolio">
          <div className="itemBoxLeft even">
            <div className="separateScreenLeft">
              <div className="childFont">
                <p style={{ textAlign: "left" }}>
                  Portfolio: (${this.state.Total}){" "}
                </p>
              </div>
              <Table1 data={this.state.data} />
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
          Data provided for free by IEX. View IEX’s Terms of <a href="https://iextrading.com/api-terms/"> Use</a>.{" "}
        </p>
        <div className="clr" />
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

