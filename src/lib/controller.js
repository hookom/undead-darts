const axios = require('axios');

const baseUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let getStatsUrl = baseUrl + 'getStats';
let getChangelogUrl = baseUrl + 'getChangelog';
let updateUrl = baseUrl;
let addSeasonUrl = baseUrl;
let getSeasonsUrl = baseUrl + 'getSeasons';
let addPlayerUrl = baseUrl;

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'Test';
    getChangelogUrl += 'Test';
    updateUrl += 'update-test.php';
    addSeasonUrl += 'add-season-test.php';
    getSeasonsUrl += 'Test';
    addPlayerUrl += 'add-player-test.php';
} else {
    // getStatsUrl += 'get-stats.php';
    // getChangelogUrl += 'get-changelog.php';
    updateUrl += 'update.php';
    addSeasonUrl += 'add-season.php';
    // getSeasonsUrl += 'get-seasons.php';
    addPlayerUrl += 'add-player.php';
}

var controller = {
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

    createNewSeason: (seasonId, playerNames, statversion) => {
        let body = 'data=' + JSON.stringify({id: seasonId, names: playerNames, statversion: statversion});

        return axios.post(addSeasonUrl, body);
    },

    addPlayer: (seasonId, statversion, playerName) => {
        let body = 'data=' + JSON.stringify({season: seasonId, player: playerName, statversion: statversion});

        return axios.post(addPlayerUrl, body);
    }
};

module.exports = controller;