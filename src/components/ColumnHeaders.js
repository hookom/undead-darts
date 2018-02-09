import React from 'react';
import { TableCell, TableHead, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

class ColumnHeaders extends React.Component {
  render() {
    return (
        <TableHead className="headerStyle">
          <TableRow>
            {
              Object.values(TrackedStats).map((stat, statIndex) => {
                // Name column does not have a Value
                let tooltipText = (stat.header === 'Name') ? stat.tooltip : stat.tooltip + '<br />Value:  ' + stat.value;
                return (
                  <TableCell 
                    key={statIndex}
                    data-multiline={true}
                    data-tip={tooltipText}
                  >{stat.header}
                    <ReactTooltip />
                  </TableCell>
                );
              })
            }
          </TableRow>
        </TableHead>
    );
  }
}

export default ColumnHeaders;
