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

    setTotalPointsForAll: (stats) => {
        stats.forEach(playerRow => {
            let total = 0;
            Object.keys(helpers.statValues).forEach(stat => {
                total += (parseInt(playerRow[stat], 10) * parseInt(helpers.statValues[stat], 10));
            });
            playerRow.totalPoints = total;
            console.log(playerRow.name + ' has ' + total + ' points');
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
