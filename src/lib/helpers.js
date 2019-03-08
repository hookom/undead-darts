const TrackedStats = require('./TrackedStats.js');

var helpers = {
  setTotalPointsFor: (stats, names) => {
      stats.filter(x => names === undefined || names.includes(x.name))
          .forEach(playerRow => {
              let version = playerRow.statversion;
              let total = 0;
              Object.keys(TrackedStats[version]).forEach(stat => {
                  let current = 0;
                  // handle negative stat values (all from past seasons, but visible from the season dropdown)
                  if (isNaN(parseInt(playerRow[stat].charAt(0), 10))) {
                      current = (-1 * parseInt(playerRow[stat].substr(1), 10) * parseInt(TrackedStats[version][stat].value, 10));
                  } else {
                      current = (parseInt(playerRow[stat], 10) * parseInt(TrackedStats[version][stat].value, 10));
                  }
                  total += current;
              });

              if (playerRow.gamesplayed !== undefined) {
                total -= playerRow.gamesplayed;
              }

              playerRow.totalPoints = total;
          });
      
      return stats;
  },

  getKingTotal: (stats) => {
      let highest = stats[0].totalPoints;
      stats
        .filter(x => x.name !== 'ZOMBIES')
        .forEach(player => {
          if (player.totalPoints > highest) {
              highest = player.totalPoints;
          }
      });
      return highest;
  },

  getOrderedPlayerNames: (stats) => {
    let names = [];
    stats.sort(this.playerSort)
      .forEach((player) => {
        if (player.name !== 'ZOMBIES') {
          names.push(player.name);
        }
      });
    return names;
  },

  playerSort: (a, b) => {
    return b.totalPoints - a.totalPoints;
  }
};

module.exports = helpers;
