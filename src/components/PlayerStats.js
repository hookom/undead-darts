import React from 'react';
import PlayerRow from './PlayerRow.js';
import Table, { TableBody } from 'material-ui/Table';
import ColumnHeaders from './ColumnHeaders';

export default ({stats, kingPoints, isDaKing, onCellChange}) =>  ( 
    <Table>
        <ColumnHeaders />
        <TableBody>
            {
              stats.sort(function(a, b) { return b.totalPoints - a.totalPoints; })
                .map((row, playerIndex) => {
                if (row.name !== 'ZOMBIES') {
                  return (
                    <PlayerRow
                      key={playerIndex}
                      row={row}
                      playerIndex={playerIndex}
                      kingPoints={kingPoints}
                      isDaKing={isDaKing(row.totalPoints)}
                      onCellChange={onCellChange}
                    />
                  );
                }
                return null;
              })
            }
        </TableBody>
    </Table>
)
