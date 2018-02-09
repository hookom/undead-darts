const TrackedStats = {
    name: {
        header: 'Name',
        tooltip: 'Player Name',
        value: ''
    },
    human: {
        header: 'Human Win',
        tooltip: 'Kill all zombies as a human',
        value: 1
    },
    survivor: {
        header: 'Survivor',
        tooltip: 'Only one human left with at least 3 zombies.<br />Must call after turn and zombies must target survivor (no res).<br />If zombies cannot kill human by its next turn, human becomes survivor',
        value: 1
    },
    coweringdefeat: {
        header: 'Cowering Defeat',
        tooltip: 'Human calls survivor but is killed by zombies',
        value: -1
    },
    resdhuman: {
        header: 'Res\'d Human',
        tooltip: 'Human resurrects and eliminates all zombies',
        value: 1
    },
    lostbulls: {
        header: 'Lost Bullseyes',
        tooltip: 'Thrower did not declare target of the bullseye',
        value: -1
    },
    catches: {
        header: 'Catches',
        tooltip: 'Catch a dart that bounces out of the board',
        value: 1
    },
    firstrdkill: {
        header: 'First Round Kill',
        tooltip: 'In the throwers first turn, they kill another player',
        value: 1
    },
    firstrdelim: {
        header: 'First Round Elimination',
        tooltip: 'In the throwers first turn, they kill another player and hit bullseye to eliminate them',
        value: 2
    },
    resdkill: {
        header: 'Res\'d Kill',
        tooltip: 'Ressurect and kill a human in one turn',
        value: 2
    },
    doubletap: {
        header: 'Double Tap',
        tooltip: 'Kill the same human twice as a human',
        value: 1
    },
    doublechomp: {
        header: 'Double Chomp',
        tooltip: 'Kill the same human twice as a zombie',
        value: 1
    },
    zombiehero: {
        header: 'Zombie Hero',
        tooltip: 'Last zombie to throw in a survivor situation kills the human',
        value: 2
    },
    buffet: {
        header: 'Buffet',
        tooltip: 'I have no clue what this one is',
        value: 2
    }
};

module.exports = TrackedStats;
