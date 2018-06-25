const axios = require('axios');

const baseUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let getStatsUrl = baseUrl + 'getStats';
let getChangelogUrl = baseUrl + 'getChangelog';
let updateUrl = baseUrl;
let addSeasonUrl = baseUrl + 'addSeason';
let getSeasonsUrl = baseUrl + 'getSeasons';
let addPlayerUrl = baseUrl + 'addPlayer';

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'Test';
    getChangelogUrl += 'Test';
    updateUrl += 'update-test.php';
    addSeasonUrl += 'Test';
    getSeasonsUrl += 'Test';
    addPlayerUrl += 'Test';
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
        return axios.post(
            addSeasonUrl,
            {
                id: seasonId,
                names: playerNames,
                statversion: statversion
            }
        );
    },

    addPlayer: (seasonId, statversion, playerName) => {
        return axios.post(
            addPlayerUrl,
            {
                season: seasonId,
                name: playerName,
                statversion: statversion
            }
        );
    }
};

module.exports = controller;