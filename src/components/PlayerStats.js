import React from 'react';
import PlayerRow from './PlayerRow.js';
import Card from 'material-ui/Card';
import ColumnHeaders from './ColumnHeaders';

export default ({stats, kingPoints, isDaKing, onCellChange}) =>  ( 
  <Card>
    <table id="StatsTable">
        <ColumnHeaders />
        <tbody>
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
        </tbody>
    </table>
  </Card>
)
