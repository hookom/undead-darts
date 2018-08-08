const TrackedStats = require('./TrackedStats.js');

var helpers = {
    setTotalPointsFor: (stats, names) => {
        stats.filter(x => names === undefined || names.includes(x.name))
            .forEach(playerRow => {
                let version = playerRow.statversion;
                let total = 0;
                Object.keys(TrackedStats[version]).forEach(stat => {
                    let current = 0;
                    if (isNaN(parseInt(playerRow[stat].charAt(0), 10))) {
                        current = (-1 * parseInt(playerRow[stat].substr(1), 10) * parseInt(TrackedStats[version][stat].value, 10));
                    } else {
                        current = (parseInt(playerRow[stat], 10) * parseInt(TrackedStats[version][stat].value, 10));
                    }
                    total += current;
                });
                playerRow.totalPoints = total;
            });
        
        return stats;
    },

    getKingTotal: (stats) => {
        let highest = 0;
        stats.forEach(player => {
            if (player.totalPoints > highest) {
                highest = player.totalPoints;
            }
        });
        return highest;
    }
};

module.exports = helpers;
