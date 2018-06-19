const axios = require('axios');

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

var controller = {
    getAllStats: (season) => {
        // return axios.get(getStatsUrl + '?season=' + season);
        return axios.get('https://us-central1-undead-darts-1.cloudfunctions.net/getStats' + '?season=' + season);
    },

    getChangelog: () => {
        // return axios.get(getChangelogUrl);
        return axios.get('https://us-central1-undead-darts-1.cloudfunctions.net/getChangelog');
    },

    updateStats: (body) => {
        return axios.post(updateUrl, body);
    },

    getSeasons: () => {
        return axios.get(getSeasonsUrl);
    },

    createNewSeason: (seasonId, playerNames, statversion) => {
        let body = 'data=' + JSON.stringify({id: seasonId, names: playerNames, statversion: statversion});

        return axios.post(addSeasonUrl, body);
    },

    addPlayer: (seasonId, playerName) => {
        let body = 'data=' + JSON.stringify({season: seasonId, player: playerName});

        return axios.post(addPlayerUrl, body);
    }
};

module.exports = controller;