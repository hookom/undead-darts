const TrackedStats = require('./TrackedStats.js');

var helpers = {
    setTotalPointsFor: (stats, names) => {
        console.log(stats)
        stats.filter(x => names === undefined || names.includes(x.name))
            .forEach(playerRow => {
                let version = playerRow.statversion;
                let total = 0;
                Object.keys(TrackedStats[version]).forEach(stat => {
                    let current = 0;
                    if (isNaN(parseInt(playerRow[stat].charAt(0)))) {
                        current = (-1 * parseInt(playerRow[stat].substr(1)) * parseInt(TrackedStats[version][stat].value));
                    } else {
                        current = (parseInt(playerRow[stat]) * parseInt(TrackedStats[version][stat].value));
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
