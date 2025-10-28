export const gameData = {
    heroes: [
        {
            id: 1,
            name: 'Barbarian King',
            description: 'The Barbarian King is a larger, more powerful version of the Barbarian. He is an immortal hero who can be deployed once per battle.',
            type: 'Dark Elixir',
            ability: 'Iron Fist (summons Barbarians and heals)',
            maxLevel: 90,
            hitpoints: '8000 (Max)',
            damagePerSecond: '400 (Max)'
        },
        {
            id: 2,
            name: 'Archer Queen',
            description: 'The Archer Queen is a stronger, more resilient version of the Archer. She is an immortal hero who can be deployed once per battle.',
            type: 'Dark Elixir',
            ability: 'Royal Cloak (invisibility and summons Archers)',
            maxLevel: 90,
            hitpoints: '3000 (Max)',
            damagePerSecond: '800 (Max)'
        },
        {
            id: 3,
            name: 'Grand Warden',
            description: 'The Grand Warden is a support hero who can switch between ground and air mode. His aura boosts nearby troops.',
            type: 'Elixir',
            ability: 'Eternal Tome (makes nearby troops invincible)',
            maxLevel: 65,
            hitpoints: '2500 (Max)',
            damagePerSecond: '250 (Max)'
        },
        {
            id: 4,
            name: 'Royal Champion',
            description: 'The Royal Champion is a fast, agile hero who targets defenses. Her ability allows her to throw her shield at multiple defenses.',
            type: 'Dark Elixir',
            ability: 'Seeking Shield (throws shield at defenses)',
            maxLevel: 40,
            hitpoints: '4500 (Max)',
            damagePerSecond: '350 (Max)'
        }
    ],
    troops: [
        {
            id: 101,
            name: 'Barbarian',
            description: 'A fearless warrior with a magnificent mustache. Barbarians are the first troop unlocked and are great for overwhelming defenses.',
            type: 'Elixir',
            housingSpace: 1,
            trainingCost: '25 Elixir',
            trainingTime: '6s',
            maxLevel: 11
        },
        {
            id: 102,
            name: 'Archer',
            description: 'These keen-eyed beauties are at home in the forest. They can shoot arrows over walls, making them versatile attackers.',
            type: 'Elixir',
            housingSpace: 1,
            trainingCost: '50 Elixir',
            trainingTime: '6s',
            maxLevel: 11
        },
        {
            id: 103,
            name: 'Giant',
            description: 'Slow, but powerful, Giants are excellent at soaking up damage and destroying defenses. They prioritize defensive structures.',
            type: 'Elixir',
            housingSpace: 5,
            trainingCost: '250 Elixir',
            trainingTime: '30s',
            maxLevel: 11
        },
        {
            id: 104,
            name: 'Dragon',
            description: 'A fearsome flying unit that breathes fire. Dragons are powerful but take up a lot of housing space.',
            type: 'Elixir',
            housingSpace: 20,
            trainingCost: '30000 Elixir',
            trainingTime: '6m',
            maxLevel: 10
        },
        {
            id: 105,
            name: 'P.E.K.K.A',
            description: 'The P.E.K.K.A is a heavily armored warrior with high damage and hitpoints. She is slow but devastating.',
            type: 'Elixir',
            housingSpace: 25,
            trainingCost: '40000 Elixir',
            trainingTime: '9m',
            maxLevel: 9
        },
        {
            id: 106,
            name: 'Hog Rider',
            description: 'A sturdy, pig-riding warrior who can jump over walls and targets defenses. He is fast and effective.',
            type: 'Dark Elixir',
            housingSpace: 5,
            trainingCost: '75 Dark Elixir',
            trainingTime: '45s',
            maxLevel: 11
        },
        {
            id: 107,
            name: 'Electro Dragon',
            description: 'A powerful flying unit that shoots chain lightning, damaging multiple targets. Very slow but extremely strong.',
            type: 'Elixir',
            housingSpace: 30,
            trainingCost: '40000 Elixir',
            trainingTime: '12m',
            maxLevel: 6
        },
        {
            id: 108,
            name: 'Super Barbarian',
            description: 'A stronger, faster Barbarian with a rage ability that activates upon deployment.',
            type: 'Super Troop',
            housingSpace: 5,
            trainingCost: '25000 Dark Elixir',
            trainingTime: '3m',
            maxLevel: 11
        }
    ],
    buildings: [
        {
            id: 201,
            name: 'Town Hall',
            description: 'The heart of your village. Upgrading it unlocks new buildings, troops, and defense levels.',
            category: 'Other',
            minThLevel: 1,
            maxLevel: 15
        },
        {
            id: 202,
            name: 'Cannon',
            description: 'A basic defensive structure that targets single ground units. Effective against high-hitpoint troops.',
            category: 'Defense',
            minThLevel: 1,
            maxLevel: 21
        },
        {
            id: 203,
            name: 'Archer Tower',
            description: 'A versatile defensive structure that targets both ground and air units. Has a long range.',
            category: 'Defense',
            minThLevel: 2,
            maxLevel: 22
        },
        {
            id: 204,
            name: 'Gold Mine',
            description: 'Generates Gold over time. Upgrade it to increase its production rate and storage capacity.',
            category: 'Resource',
            minThLevel: 1,
            maxLevel: 16
        },
        {
            id: 205,
            name: 'Elixir Collector',
            description: 'Generates Elixir over time. Essential for training troops and upgrading buildings.',
            category: 'Resource',
            minThLevel: 1,
            maxLevel: 16
        },
        {
            id: 206,
            name: 'Barracks',
            description: 'Trains Elixir troops. Upgrade to unlock new troops and reduce training time.',
            category: 'Army',
            minThLevel: 1,
            maxLevel: 16
        },
        {
            id: 207,
            name: 'Dark Barracks',
            description: 'Trains Dark Elixir troops. Unlocks powerful units like Hog Riders and Golems.',
            category: 'Army',
            minThLevel: 7,
            maxLevel: 10
        },
        {
            id: 208,
            name: 'Wizard Tower',
            description: 'A powerful defensive structure that deals splash damage to both ground and air units.',
            category: 'Defense',
            minThLevel: 5,
            maxLevel: 15
        },
        {
            id: 209,
            name: 'Air Defense',
            description: 'Specialized defensive structure that targets only air units. Crucial for protecting against air attacks.',
            category: 'Defense',
            minThLevel: 4,
            maxLevel: 13
        }
    ]
};
