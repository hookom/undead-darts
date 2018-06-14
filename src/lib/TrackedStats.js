const TrackedStats = {
    v4: {
        human: {
            header: 'Human Win',
            value: 3,
            tooltip: 'Eliminate all zombies and humans without dying.'
        },
        resdhuman: {
            header: 'Res\'d Human Win',
            value: 5,
            tooltip: 'Eliminate all zombies and humans after resurrecting.'
        },
        survivor: {
            header: 'Survivor',
            value: 5,
            tooltip: 'As the last human and with at least 3 zombies.<br />'
                    + 'Must be called after you throw.<br />'
                    + 'Zombies have a final round to kill the human.'
        },
        coweringdefeat: {
            header: 'Cowering Defeat',
            value: -2,
            tooltip: 'Human calls survivor but is killed by zombies.'
        },
        lostbulls: {
            header: 'Lost Bullseyes',
            value: -1,
            tooltip: 'Zombie did not declare target of a bullseye.'
        },
        catches: {
            header: 'Catches',
            value: 10,
            tooltip: 'Catch a dart that bounces out of the board.'
        },
        firstrdkill: {
            header: 'First Round Kill',
            value: 1,
            tooltip: 'Kill another player during your first turn.'
        },
        firstrdelim: {
            header: 'First Round Elimination',
            value: 2,
            tooltip: 'Kill another player and hit bullseye to eliminate<br />'
                    + 'them during your first turn.'
        },
        resdkill: {
            header: 'Res\'d Kill',
            value: 2,
            tooltip: 'Resurrect, become a killer, and kill a human in one turn.'
        },
        zombiehero: {
            header: 'Zombie Hero',
            value: 2,
            tooltip: 'A zombie throws 2+ bullseyes in a single turn to<br />'
                    + 'prevent a human from attaining survivor.'
        },
        buffet: {
            header: 'Buffet',
            value: 1,
            tooltip: 'Zombie kills two humans in a single turn.'
        },
        retaliation: {
            header: 'Retaliation',
            value: 2,
            tooltip: 'Killed by someone, then you hit 2 bullseyes in your<br />'
                    + 'next turn as a zombie to retaliate.'
        },
        flawlessfinish: {
            header: 'Flawless Finish',
            value: 1,
            tooltip: 'In a single turn, kill 2 people, then with your<br />'
                    + 'final dart, bullseye to win (stacks).'
        },
        bully: {
            header: 'Bully',
            value: 1,
            tooltip: 'Kill and/or eat the same human twice in a game.'
        }
    },
    v3: {
        human: {
            header: 'Human Win',
            value: 3,
            tooltip: 'Eliminate all zombies and humans (res\'d or normal).'
        },
        survivor: {
            header: 'Survivor',
            value: 5,
            tooltip: 'As the last human and with at least 3 zombies.<br />'
                    + 'Must be called after you throw.<br />'
                    + 'Zombies have a final round to kill the human.'
        },
        coweringdefeat: {
            header: 'Cowering Defeat',
            value: -2,
            tooltip: 'Human calls survivor but is killed by zombies.'
        },
        lostbulls: {
            header: 'Lost Bullseyes',
            value: -1,
            tooltip: 'Zombie did not declare target of a bullseye.'
        },
        catches: {
            header: 'Catches',
            value: 10,
            tooltip: 'Catch a dart that bounces out of the board.'
        },
        firstrdkill: {
            header: 'First Round Kill',
            value: 1,
            tooltip: 'Kill another player during your first turn.'
        },
        firstrdelim: {
            header: 'First Round Elimination',
            value: 2,
            tooltip: 'Kill another player and hit bullseye to eliminate<br />'
                    + 'them during your first turn.'
        },
        resdkill: {
            header: 'Res\'d Kill',
            value: 2,
            tooltip: 'Resurrect, become a killer, and kill a human in one turn.'
        },
        zombiehero: {
            header: 'Zombie Hero',
            value: 2,
            tooltip: 'A zombie throws 2+ bullseyes in a single turn to<br />'
                    + 'prevent a human from attaining survivor.'
        },
        buffet: {
            header: 'Buffet',
            value: 1,
            tooltip: 'Zombie kills two humans in a single turn.'
        },
        retaliation: {
            header: 'Retaliation',
            value: 2,
            tooltip: 'Killed by someone, then you hit 2 bullseyes in your<br />'
                    + 'next turn as a zombie to retaliate.'
        },
        flawlessfinish: {
            header: 'Flawless Finish',
            value: 1,
            tooltip: 'In a single turn, kill 2 people, then with your<br />'
                    + 'final dart, bullseye to win (stacks).'
        },
        bully: {
            header: 'Bully',
            value: 1,
            tooltip: 'Kill and/or eat the same human twice in a game.'
        }
    },
    v2: {
        human: {
            header: 'Human Win',
            value: 3,
            tooltip: 'Eliminate all zombies and humans (res\'d or normal).'
        },
        survivor: {
            header: 'Survivor',
            value: 2,
            tooltip: 'As the last human and with at least 3 zombies.<br />'
                    + 'Must be called after you throw.<br />'
                    + 'Zombies have a final round to kill the human.'
        },
        coweringdefeat: {
            header: 'Cowering Defeat',
            value: -1,
            tooltip: 'Human calls survivor but is killed by zombies.'
        },
        lostbulls: {
            header: 'Lost Bullseyes',
            value: -1,
            tooltip: 'Zombie did not declare target of a bullseye.'
        },
        catches: {
            header: 'Catches',
            value: 1,
            tooltip: 'Catch a dart that bounces out of the board.'
        },
        firstrdkill: {
            header: 'First Round Kill',
            value: 1,
            tooltip: 'Kill another player during your first turn.'
        },
        firstrdelim: {
            header: 'First Round Elimination',
            value: 2,
            tooltip: 'Kill another player and hit bullseye to eliminate<br />'
                    + 'them during your first turn.'
        },
        resdkill: {
            header: 'Res\'d Kill',
            value: 2,
            tooltip: 'Resurrect, become a killer, and kill a human in one turn.'
        },
        zombiehero: {
            header: 'Zombie Hero',
            value: 2,
            tooltip: 'A zombie throws 2+ bullseyes in a single turn to<br />'
                    + 'prevent a human from attaining survivor.'
        },
        buffet: {
            header: 'Buffet',
            value: 1,
            tooltip: 'Zombie kills two humans in a single turn.'
        },
        retaliation: {
            header: 'Retaliation',
            value: 2,
            tooltip: 'Killed by someone, then you hit 2 bullseyes in your<br />'
                    + 'next turn as a zombie to retaliate.'
        },
        flawlessfinish: {
            header: 'Flawless Finish',
            value: 1,
            tooltip: 'In a single turn, kill 2 people, then with your<br />'
                    + 'final dart, bullseye to win.'
        },
        bully: {
            header: 'Bully',
            value: 1,
            tooltip: 'Kill and/or eat the same human twice in a game.'
        }
    },
    v1: {
        human: {
            header: 'Human Win',
            value: 1,
            tooltip: 'Eliminate all zombies and humans.'
        },
        survivor: {
            header: 'Survivor',
            value: 1,
            tooltip: 'As the last human and with at least 3 zombies.<br />'
                     + 'Must be called after you throw.<br />'
                     + 'Zombies have a final round to kill the human.'
        },
        coweringdefeat: {
            header: 'Cowering Defeat',
            value: -1,
            tooltip: 'Human calls survivor but is killed by zombies.'
        },
        resdhuman: {
            header: 'Res\'d Human',
            value: 1,
            tooltip: 'Human resurrects and eliminates all other players.'
        },
        lostbulls: {
            header: 'Lost Bullseyes',
            value: -1,
            tooltip: 'Zombie did not declare target of a bullseye.'
        },
        catches: {
            header: 'Catches',
            value: 1,
            tooltip: 'Catch a dart that bounces out of the board.'
        },
        firstrdkill: {
            header: 'First Round Kill',
            value: 1,
            tooltip: 'Kill another player during your first turn.'
        },
        firstrdelim: {
            header: 'First Round Elimination',
            value: 2,
            tooltip: 'Kill another player and hit bullseye to eliminate<br />'
                     + 'them during your first turn.'
        },
        resdkill: {
            header: 'Res\'d Kill',
            value: 2,
            tooltip: 'Resurrect, become a killer, and kill a human in one turn.'
        },
        doubletap: {
            header: 'Double Tap',
            value: 1,
            tooltip: 'Kill the same human twice as a killer.'
        },
        doublechomp: {
            header: 'Double Chomp',
            value: 1,
            tooltip: 'Kill the same human twice as a zombie.'
        },
        zombiehero: {
            header: 'Zombie Hero',
            value: 2,
            tooltip: 'A zombie throws 2+ bullseyes in a single turn to<br />'
                     + 'prevent a human from attaining survivor.'
        },
        buffet: {
            header: 'Buffet',
            value: 2,
            tooltip: 'Zombie kills two humans in a single turn.'
        },
        retaliation: {
            header: 'Retaliation',
            value: 2,
            tooltip: 'Killed by someone, then you hit 2 bullseyes as a<br />'
                     + 'zombie to retaliate.'
        },
        flawlessfinish: {
            header: 'Flawless Finish',
            value: 1,
            tooltip: 'In a single turn, kill 2 people, then with your<br />'
                     + 'final dart, bullseye to win.'
        },
        multitalented: {
            header: 'Multi-Talented',
            value: 1,
            tooltip: 'Kill the same person as a human and as a zombie.'
        }
    }
};

module.exports = TrackedStats;
