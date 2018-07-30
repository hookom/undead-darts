const axios = require('axios');

// const cloudFunctionsUrl = 'https://us-central1-undead-darts-1.cloudfunctions.net/';
let baseUrl = 'http://35.237.86.42';

// let addSeasonUrl = cloudFunctionsUrl + 'addSeason';
// let addPlayerUrl = cloudFunctionsUrl + 'addPlayer';

const hostname = window && window.location && window.location.hostname;
if(hostname === 'localhost') {
    baseUrl = 'http://localhost';

    // addSeasonUrl += 'Test';
    // addPlayerUrl += 'Test';
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

    // createNewSeason: (seasonId, playerNames, statversion) => {
    //     return axios.post(
    //         addSeasonUrl,
    //         {
    //             id: seasonId,
    //             names: playerNames,
    //             statversion: statversion
    //         }
    //     );
    // },

    // addPlayer: (newRow) => {
    //     return axios.post(
    //         addPlayerUrl,
    //         newRow
    //     );
    // }
};

module.exports = controller;