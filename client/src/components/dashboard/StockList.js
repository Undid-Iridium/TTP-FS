import React, { Component } from "react";
//import axios from "axios";
import "../../App.css";
export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, stocksFirstHalf: [], stocksSecondHalf: [] };
  }
  async componentDidMount() {
    //const data = await  axios.get('https://api.iextrading.com/1.0/ref-data/symbols').then(function (response) { console.log(response); return response;}).catch(error => console.log(error));
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(response => response.json())
      .then(objData => {
        console.log(objData);

        //console.log(objData);
        const half = objData.length / 2;
        //console.log(half);
        const first = objData.slice(0, half | 0);
        const second = objData.slice(Math.ceil(half), objData.length);
        this.setState({
          loading: false,
          stocksFirstHalf: first,
          stocksSecondHalf: second
        });
        //console.log(first + " f, s " + second);
      });
  }

  render() {
    //console.log(this.state.stocks);
    return (
      <div>
        <table className="tableLeft table_on_the_left">
          <tbody>
            {this.state.stocksFirstHalf.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table className="tableRight table_on_the_right">
          <tbody>
            {this.state.stocksSecondHalf.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
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

