import React, { Component } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mainLogo from "../../transaction.png";

const divStyle = {
  width: "100%",
  height: "100vh",

  backgroundImage: `url(${mainLogo})`,
  backgroundrepeat: "repeat",
  backgroundsize: "100%",
  position: "relative",
  top: "-25px"
};



class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, stocksFirstHalf: [], stocksSecondHalf: [] };
  }
  async componentDidMount() {
    //const data = await  axios.get('https://api.iextrading.com/1.0/ref-data/symbols').then(function (response) { console.log(response); return response;}).catch(error => console.log(error));
    const { changeUser } = this.props.auth;
    var objData = [];
    var json = changeUser.transactions;
    for(var value in json){
        objData.push(json[value].transactions);
    }
    console.log("HERRO", objData);
    if (objData.length === 0) {
      console.log("empty");
      objData = [
        { transactions: "EMPTY" },
      ];
    }

        this.setState({
          loading: false,
          stocksFirstHalf: objData,
          stocksSecondHalf: []
        });

    
  }

  render() {
    //console.log(this.state.stocks);
    return (
      <div style={divStyle}>
        <h3> Transactions: </h3>
        <table className="tableLeft table_on_the_left_trans">
          <tbody>
            {this.state.stocksFirstHalf.map(function(item, key) {
              return (
                <tr key={key}>
                  <td className = " less-padding-on-right ">BUY  ({item.Ticker})&emsp;-  </td>
                  <td>{item.Amount} Shares</td>
                  <td>@{item.Price} </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table className="tableRight table_on_the_right_trans">
          <tbody>
            {this.state.stocksSecondHalf.map(function(item, key) {
              return (
                <tr key={key}>
                   <td>BUY({item.Ticker}) -</td>
                  <td>{item.Amount} Shares</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/*<p>Welcome to StockList Component!!</p>
        <div><pre>{JSON.stringify(this.state.stocks, null, 2) }</pre></div>;*/}
      </div>
    );
  }
}

Transactions.propTypes = {
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

export default connect(mapStateToProps)(Transactions);

