export const troops = [
    {
        id: 'barbarian',
        name: 'Barbarian',
        type: 'Ground',
        target: 'Any',
        housingSpace: 1,
        trainingCost: '25 Elixir',
        description: 'A fearless warrior with a magnificent mustache. Barbarians are the first troop unlocked and are excellent for swarming defenses.'
    },
    {
        id: 'archer',
        name: 'Archer',
        type: 'Ground & Air',
        target: 'Any',
        housingSpace: 1,
        trainingCost: '50 Elixir',
        description: 'Archers are keen-eyed sharpshooters who can attack targets on the ground or in the air from a distance.'
    },
    {
        id: 'giant',
        name: 'Giant',
        type: 'Ground',
        target: 'Defenses',
        housingSpace: 5,
        trainingCost: '250 Elixir',
        description: 'Giants are slow but powerful, prioritizing defenses and soaking up damage for other troops.'
    },
    {
        id: 'goblin',
        name: 'Goblin',
        type: 'Ground',
        target: 'Resources',
        housingSpace: 1,
        trainingCost: '75 Elixir',
        description: 'Goblins are fast and greedy, always seeking out resources like Gold and Elixir.'
    },
    {
        id: 'wizard',
        name: 'Wizard',
        type: 'Ground & Air',
        target: 'Any',
        housingSpace: 4,
        trainingCost: '3000 Elixir',
        description: 'Wizards are powerful spellcasters who deal area damage to both ground and air units.'
    },
    {
        id: 'dragon',
        name: 'Dragon',
        type: 'Air',
        target: 'Any',
        housingSpace: 20,
        trainingCost: '25000 Elixir',
        description: 'Dragons are fearsome flying beasts that breathe fire, dealing heavy damage to anything in their path.'
    }
];
