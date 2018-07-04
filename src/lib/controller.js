const axios = require('axios');

const baseUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let getStatsUrl = baseUrl + 'getStats';
let getChangelogUrl = baseUrl + 'getChangelog';
let updateUrl = baseUrl + 'updateStat';
let addSeasonUrl = baseUrl + 'addSeason';
let getSeasonsUrl = baseUrl + 'getSeasons';
let addPlayerUrl = baseUrl + 'addPlayer';

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'Test';
    getChangelogUrl += 'Test';
    updateUrl += 'Test';
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

    addPlayer: (newRow) => {
        return axios.post(
            addPlayerUrl,
            newRow
        );
    }
};

module.exports = controller;