const axios = require('axios');

// const cloudFunctionsUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let baseUrl = 'http://35.237.86.42';

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    baseUrl = 'http://localhost';
}

var controller = {
    getAllStats: () => {
        return axios.get(baseUrl + ':8080/stats');
    },

    getChangelog: () => {
        return axios.get(baseUrl + ':8080/changelog');
    },

    updateStat: (body) => {
        return axios.post(baseUrl + ':8080/update-stat', body);
    },

    createNewSeason: (seasonId, playerNames, statversion, stats) => {
        return axios.post(
            baseUrl + ':8080/add-season',
            {
                names: playerNames,
                id: seasonId,
                statversion: statversion,
                stats: stats
            }
        );
    },

    addPlayer: (seasonId, playerNames, statversion, stats) => {
        return axios.post(
            baseUrl + ':8080/add-player',
            {
                names: playerNames,
                id: seasonId,
                statversion: statversion,
                stats: stats
            }
        );
    }
};

module.exports = controller;