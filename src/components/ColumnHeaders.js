import React from 'react';
import { TableCell, TableHead, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

class ColumnHeaders extends React.Component {
  render() {
    return (
        <TableHead className="headerStyle">
          <TableRow>
            <TableCell>Player Name</TableCell>
            {
              Object.values(TrackedStats).map((stat, statIndex) => {
                return (
                  <TableCell key={statIndex} data-multiline={true} data-tip={stat.tooltip + '<br />Value:  ' + stat.value}>
                    {stat.header}
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
