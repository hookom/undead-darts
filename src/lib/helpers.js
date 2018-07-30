const TrackedStats = require('./TrackedStats.js');

var helpers = {
    setTotalPointsFor: (stats, names) => {
        stats.filter(x => names === undefined || names.includes(x.name))
            .forEach(playerRow => {
                let total = 0;
                Object.keys(TrackedStats[stats[0].statversion]).forEach(stat => {
                    let current = (parseInt(playerRow[stat], 10) * parseInt(TrackedStats[stats[0].statversion][stat].value, 10));
                    if (isNaN(parseInt(stat.charAt(0), 10))) {
                        total -= current;
                    } else {
                        total += current;
                    }
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
