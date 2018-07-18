const axios = require('axios');

const baseUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let getStatsUrl = baseUrl + 'getStats';
let getChangelogUrl = baseUrl + 'getChangelog';
let updateUrl = baseUrl + 'updateStat';
let addSeasonUrl = baseUrl + 'addSeason';
let addPlayerUrl = baseUrl + 'addPlayer';

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    getStatsUrl += 'Test';
    getChangelogUrl += 'Test';
    updateUrl += 'Test';
    addSeasonUrl += 'Test';
    addPlayerUrl += 'Test';
}

var controller = {
    getAllStats: () => {
        return axios.get('http://35.237.86.42:8080/stats');
    },

    getChangelog: () => {
        return axios.get('http://35.237.86.42:8080/changelog');
    },

    updateStats: (body) => {
        return axios.post(updateUrl, body);
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