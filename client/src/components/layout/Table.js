import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
//import '../css/Table.css';
//import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
 
 
class Table1 extends Component {

  trClassFormat(row, rowIndex) {
  // row is the current row data
  var color;
  console.log(row.Open);
  if(parseInt(row.Open, 10) === 3){
    color = "green";
  }
  else if(parseInt(row.status, 10) === 2){
    color = "red";
  }
  else if (parseInt(row.status, 10) === 1){
    color = "gray";
  }
  return color;  // return class name.
  }

  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} 
            trClassName={this.trClassFormat}
        >
          <TableHeaderColumn isKey dataField='Ticker'  width={'35%'}>
           Ticker
          </TableHeaderColumn>
          <TableHeaderColumn dataField='Amount' width={'35%'}>
           Stock Owned
          </TableHeaderColumn>
          <TableHeaderColumn dataField='Total' width={'35%'}>
           Total Revenue
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table1;
