const axios = require('axios');
const TrackedStats = require('./TrackedStats.js');

const baseUrl = 'http://www.undeaddarts.com/api/';
let getStatsUrl = baseUrl;
let getChangelogUrl = baseUrl;
let updateUrl = baseUrl;
let addSeasonUrl = baseUrl;
let getSeasonsUrl = baseUrl;
let addPlayerUrl = baseUrl;

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'get-stats-test.php';
    getChangelogUrl += 'get-changelog-test.php';
    updateUrl += 'update-test.php';
    addSeasonUrl += 'add-season-test.php';
    getSeasonsUrl += 'get-seasons-test.php';
    addPlayerUrl += 'add-player-test.php';
} else {
    getStatsUrl += 'get-stats.php';
    getChangelogUrl += 'get-changelog.php';
    updateUrl += 'update.php';
    addSeasonUrl += 'add-season.php';
    getSeasonsUrl += 'get-seasons.php';
    addPlayerUrl += 'add-player.php';
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

    getSeasons: () => {
        return axios.get(getSeasonsUrl);
    },

    createNewSeason: (seasonId, playerNames) => {
        let body = 'data=' + JSON.stringify({id: seasonId, names: playerNames});

        return axios.post(addSeasonUrl, body);
    },

    addPlayer: (seasonId, playerName) => {
        let body = 'data=' + JSON.stringify({season: seasonId, player: playerName});

        return axios.post(addPlayerUrl, body);
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
