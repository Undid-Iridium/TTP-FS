import React, { Component } from 'react';
import "../../App.css";
export default class Portfolio extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Portfolio Todo Component!!</p>
                <p id="footer"> Data provided for free by IEX. View IEX’s Terms of Use. </p>
            </div>
        )
    }
}

//https://api.iextrading.com/1.0/stock/aapl/chart
//https://iextrading.com/developer/docs/#chart
//https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=1
//https://iextrading.com/developer/docs/#batch-requests
