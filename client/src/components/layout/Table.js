import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
//import '../css/Table.css';
//import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
 
 
class Table1 extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} >
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
