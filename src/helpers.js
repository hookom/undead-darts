var axios = require('axios');

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
        console.log(getStatsUrl)
        return axios.get(getStatsUrl + '?season=' + season);
    },

    getChangelog: () => {
        return axios.get(getChangelogUrl);
    },

    updateStats: (body) => {
        return axios.post(updateUrl, body);
    },

    columns: {
        name: 'Name',
        season: 'Season',
        zombiewins: 'Zombie Wins',
        human: 'Human Win',
        survivor: 'Survivor',
        coweringdefeat: 'Cowering Defeat',
        resdhuman: 'Res\'d Human',
        lostbulls: 'Lost Bullseyes',
        catches: 'Catches',
        firstrdkill: 'First Round Kill',
        firstrdelim: 'First Round Elimination',
        resdkill: 'Res\'d Kill',
        doubletap: 'Double Tap',
        doublechomp: 'Double Chomp',
        zombiehero: 'Zombie Hero',
        buffet: 'Buffet'
    },

    statValues: {
        human: 1,
        survivor: 1,
        coweringdefeat: -1,
        resdhuman: 1,
        lostbulls: -1,
        catches: 1,
        firstrdkill: 1,
        firstrdelim: 2,
        resdkill: 2,
        doubletap: 1,
        doublechomp: 1,
        zombiehero: 2,
        buffet: 2
    },

    getDaChamp: (stats) => {
        let champ = [];
        let high = 0;
        stats.forEach(playerRow => {
            let playerHigh = 0;
            Object.keys(helpers.statValues).forEach(stat => {
                playerHigh += (parseInt(playerRow[stat], 10) * parseInt(helpers.statValues[stat], 10));
            });
            if (playerHigh > high) {
                // console.log(playerRow['name'] + '\'s total of ' + playerHigh + ' is replacing current high: ' + high + ' of: ', champ)
                high = playerHigh;
                champ = [playerRow['name']];
            } else if (playerHigh === high) {
                // console.log(playerRow['name'] + '\'s total of ' + playerHigh + ' ties the current high: ' + high + ' by: ', champ)
                champ.push(playerRow['name']);
            }
        });
        // console.log(champ)
        return champ;
    }
};

module.exports = helpers;
