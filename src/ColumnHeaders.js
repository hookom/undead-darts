import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import helpers from './helpers.js';
import ReactTooltip from 'react-tooltip';

class ColumnHeaders extends React.Component {
  render() {
    
    let tooltipText = '';
    
    return (
        <TableHead className="headerStyle">
        <TableRow>
            {Object.values(helpers.columns).map((header, headerIndex) => {
              if (header.header !== 'Season' && header.header !== 'Zombie Wins') {
                  tooltipText = header.header === 'Name' ? 
                    tooltipText = header.tooltip :
                    tooltipText = header.tooltip + '<br />Value:  ' + header.value
                  return (
                    <TableCell 
                      key={headerIndex}
                      data-multiline={true}
                      data-tip={tooltipText}
                    >{header.header}
                      <ReactTooltip />
                    </TableCell>
                  );
                }
              return null;
            })}
        </TableRow>
        </TableHead>
    );
  }
}

export default ColumnHeaders;
