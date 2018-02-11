import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default ({changelog}) => (
        <Table>
            <ChangeHeader/>
            <TableBody>
              <ChangeRows changelog={changelog}/>
            </TableBody>
        </Table>

)

const ChangeRows = ({changelog}) => {
  return (
    changelog.map((row, changeIndex) => {
      return (
        <ChangeRow 
          key={changeIndex} 
          index={changeIndex} changeRow={row}
        />
      );
    })
  )
}

const ChangeHeader = () => {
  return (
      <TableHead>
          <TableRow>
            <TableCell>CHANGE</TableCell>
            <TableCell>TIMESTAMP</TableCell>
          </TableRow>
      </TableHead>
  )
}

const ChangeRow = ({index, changeRow}) => {
  return (
    <TableRow key={index}>
      <TableCell>
        <div>{changeRow.message}</div>
      </TableCell>
      <TableCell>
        <div>{changeRow.timestamp}</div>
      </TableCell>
    </TableRow>
  )
}
