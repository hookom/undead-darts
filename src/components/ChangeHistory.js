import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ChangeHistory extends React.Component {
  render() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                  <TableCell>CHANGE</TableCell>
                  <TableCell>TIMESTAMP</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                  this.props.changelog.map((row, changeIndex) => {
                    return (
                      <TableRow key={changeIndex}>
                          <TableCell>
                            <div>{row['message']}</div>
                          </TableCell>
                          <TableCell>
                            <div>{row['timestamp']}</div>
                          </TableCell>
                      </TableRow>
                    );
                  })
                }
            </TableBody>
        </Table>
    );
  }
}

export default ChangeHistory;
