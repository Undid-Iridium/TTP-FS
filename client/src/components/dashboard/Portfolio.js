import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import "../../App.css";
import mainLogo from "../../interlaced.png";
import PropTypes from "prop-types";
import Table1 from "../layout/Table";
import { setChangeUser } from "../../actions/authActions";
const updateUser = async userData => {

  var result = await fetch("http://localhost:5000/api/users/updateStock", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(function(err) {
      console.log(err);
    });

  return result;
};

function findElement(arr, propName, propValue) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i][propName] == propValue) return arr[i];

  // will return undefined if not found; you could return a default instead   backgroundSize: 'cover',
}

const updateAll = dataV => () => {
  setChangeUser(dataV);
};

function isInt(n) {
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
      data: [],
      balance: 0,
      purchase: false
    };
  }
  async componentDidMount() {
    //const data = await  axios.get('https://api.iextrading.com/1.0/ref-data/symbols').then(function (response) { console.log(response); return response;}).catch(error => console.log(error));
    const { changeUser } = this.props.auth;
    var stockObj = [];
    console.log(changeUser.stocks);
    for (var item of changeUser.stocks) {
      var symbol = item.Ticker;

      var link = "https://api.iextrading.com/1.0/stock/" + symbol + "/price";
      var currtotal = await fetch(link)
        .then(objOri => objOri.json())
        .then(objData => {
          var itemValue = item.Amount;
          itemValue *= objData;
          stockObj.push({
            Ticker: symbol,
            Amount: item.Amount,
            Total: itemValue
          });
          
         return itemValue;
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
            Total: this.state.Total + currtotal
      });
    }
    console.log(stockObj, "WHAT");
    this.setState({
            data: stockObj,
    });
    localStorage.setItem("balance", this.props.auth.changeUser.balance);
    this.setState({ balance: this.props.auth.changeUser.balance });

  }

  componentWillReceiveProps(nextProps) {
  
    if (this.props.balance !== nextProps.balance) {
      if (this.props.balance > this.props.auth.changeUser.balance) {
        //Post request to check correct number, at that rate might as well always do post request.
        //localStorage.setItem("balance", this.props.auth.changeUser.balance);
      }
      //this.setState({ balance: localStorage.balance });
    }
  
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { changeUser } = this.props.auth;
   
    const stockPurchase = {
      Ticker: this.state.Ticker,
      Amount: parseInt(this.state.Quantity, 10),
      Total: 0
    };
    var symbol = this.state.Ticker;
  
    var link = "https://api.iextrading.com/1.0/stock/" + symbol + "/price";
    fetch(link)
      .then(objOri => objOri.json())
      .then(objData => {
        if (objData * stockPurchase.Quantity > changeUser.balance) {
          alert("You do not have sufficient funds");
        } else {
          stockPurchase.value = objData * stockPurchase.Amount;
          const userData = {
            id: changeUser.id,
            cost: stockPurchase.value,
            stock: {
              Ticker: stockPurchase.Ticker,
              Amount: stockPurchase.Amount,
              Total : 0
            }
          };
          var newData;
          updateUser(userData)
            .then(result => {
              this.setState({ balance: result.balance });
              localStorage.balance = result.balance;
              changeUser.balance = result.balance;
              var inStocks = false;
              var stateData = this.state.data;
              for (var i = 0; i < stateData.length; i++) {
                if (stateData[i].Ticker == stockPurchase.Ticker) {
                  console.log("pre total " , stateData[i].Amount, stockPurchase.Amount);
                  var totalAmount =
                    parseInt(stateData[i].Amount, 10) +
                    parseInt(stockPurchase.Amount, 10);
                  console.log("totalAMount" , totalAmount);
                  var totalCost =
                    parseInt(objData, 10) * parseInt(totalAmount, 10);

                  stateData[i].Amount = totalAmount;
                  stateData[i].Total = parseInt(totalCost,10) + parseInt(stockPurchase.Amount, 10) * parseInt(objData, 10) ;
                  inStocks = true;

                  var balanceVar =  parseInt(this.state.Total,10) + parseInt(stockPurchase.Amount, 10) * parseInt(objData, 10);
                  console.log("this.state.Total", this.state.Total);
                  console.log("NEW TOTAL" , stateData[i].Total);
                 

                  this.setState({
                    data: stateData,
                    Total: parseInt(balanceVar, 10)
                  });
                  console.log(stateData);
                 
                  changeUser.stocks = stateData;
                  
                  console.log("FOUND IN STOCKS");
                  break;
                }
              }
              if (!inStocks) {
                console.log("NOT IN STOCKS");
                var itemValue = stockPurchase.Amount;
               
                itemValue *= objData;
                stockPurchase.Total = parseInt(itemValue, 10);
                stateData.push(stockPurchase);
                var balanceVar = this.state.Total;
                balanceVar +=
                  parseInt(stockPurchase.Amount, 10) * parseInt(objData, 10);
                this.setState({
                  data: stateData,
                  Total: parseInt(balanceVar, 10)
                });
                console.log("STATE DATA", stateData);
                changeUser.stocks = stateData;
               
              }

              this.props.setChangeUser(this.props.auth.changeUser);
            })
            .catch(err => console.log(err));
          alert(
            `Congrats, you purchased ${stockPurchase.Amount} ${
              stockPurchase.Ticker
            }`
          );
        }
      })
      .catch(err => {
        alert("Incorrect Ticker/Symbol");
      });
    console.log("Stock Purchase", stockPurchase);
  };

  validateForm() {
    var confirm = false;
    confirm =
      this.state.Quantity > 0 &&
      this.state.Ticker.length > 0 &&
      isInt(this.state.Quantity);
    confirm = isInt(this.state.Quantity);

    return confirm;
  }

  render() {
    //https://codesandbox.io/s/2omrn3oq30 https://www.npmjs.com/package/react-table

    const { changeUser } = this.props.auth;
    
    //console.log(this.state.data);
    const { errors } = this.state;
    return (
      <div style={divStyle}>
        <div className="portfolio">
          <div className="itemBoxLeft even">
            <div className="separateScreenLeft">
              <div className="childFont">
                <p style={{ textAlign: "left" }}>
                  Portfolio: (${parseInt(this.state.Total, 10)}){" "}
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
                        Account Balance: ${parseInt(
                          this.state.balance,
                          10
                        )}{" "}
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
          Data provided for free by IEX. View IEX’s Terms of{" "}
          <a href="https://iextrading.com/api-terms/"> Use</a>.{" "}
        </p>
        <div className="clr" />
      </div>
    );
  }
}

Portfolio.propTypes = {
  setChangeUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  changedUser: state.auth.changedUser,
  auth: state.auth,
  errors: state.errors
});

function mapDispatchToProps(dispatch) {
  return {
    setChangeUser: decode => {
      dispatch(setChangeUser(decode));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
//https://api.iextrading.com/1.0/stock/aapl/chart
//https://iextrading.com/developer/docs/#chart
//https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=1
//https://iextrading.com/developer/docs/#batch-requests

