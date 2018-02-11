const axios = require('axios');
const TrackedStats = require('./TrackedStats.js');

const baseUrl = 'http://www.undeaddarts.com/api/';
let getStatsUrl = baseUrl;
let getChangelogUrl = baseUrl;
let updateUrl = baseUrl;

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'getStats-test.php';
    getChangelogUrl += 'getChangelog-test.php';
    updateUrl += 'update-test.php';
} else {
    getStatsUrl += 'getStats.php';
    getChangelogUrl += 'getChangelog.php';
    updateUrl += 'update.php';
}

var helpers = {
    getAllStats: (season) => {
        return axios.get(getStatsUrl + '?season=' + season);
    },

    getChangelog: () => {
        return axios.get(getChangelogUrl);
    },

    updateStats: (body) => {
        return axios.post(updateUrl, body);
    },

    setTotalPointsFor: (stats, names) => {
        stats.filter(x => names === undefined || names.includes(x.name))
            .forEach(playerRow => {
                let total = 0;
                Object.keys(TrackedStats).forEach(stat => {
                    total += (parseInt(playerRow[stat], 10) * parseInt(TrackedStats[stat].value, 10));
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
