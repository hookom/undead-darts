import React from 'react';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js'

export default () => (
    <thead className="headerStyle">
      <tr>
        <th>Player Name</th>
        {
          Object.values(TrackedStats).map((stat, statIndex) => {
            return (
              <ColumnHeader key={statIndex} index={statIndex} stat={stat}/>
            );
          })
        }
      </tr>
    </thead>
)

const ColumnHeader = ({index, stat}) => {
  return (
    <th 
      className="mdl-data-table__cell--non-numeric"
      key={index} 
      data-multiline={true} 
      data-tip={stat.tooltip + '<br />Value:  ' + stat.value}>
          {stat.header}
          <ReactTooltip />
    </th>

)}

