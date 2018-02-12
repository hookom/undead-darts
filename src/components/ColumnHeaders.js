import React from 'react';
import { TableCell, TableHead, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

export default () => (
    <TableHead className="headerStyle">
      <TableRow>
        <TableCell>Player Name</TableCell>
        {
          Object.values(TrackedStats).map((stat, statIndex) => {
            return (
              <ColumnHeader key={statIndex} index={statIndex} stat={stat}/>
            );
          })
        }
      </TableRow>
    </TableHead>
)

const ColumnHeader = ({index, stat}) => {
  return (
    <TableCell 
      key={index} 
      data-multiline={true} 
      data-tip={stat.tooltip + '<br />Value:  ' + stat.value}>
          {stat.header}
          <ReactTooltip />
    </TableCell>

)}

