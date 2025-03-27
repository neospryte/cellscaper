// backend/utils/generateRandomCell.js

function randomFromWeightedPool(pool) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0)
    const rand = Math.random() * totalWeight
    let cumulative = 0

    for (const item of pool) {
        cumulative += item.weight
        if (rand < cumulative) return item
    }
}

// modifier generation
function pickRandomSubset(array, max = 2) {
    const shuffled = array.sort(() => 0.5 - Math.random())
    const count = Math.floor(Math.random() * (max + 1))
    return shuffled.slice(0, count)
}

function generateRandomCell() {
    const shapes = ['round', 'angular']

    const colorPool = [
        { name: 'Blue', weight: 40 },
        { name: 'Red', weight: 25 }
    ]

    const finishTiers = [
        {
            tier: 'common',
            weight: 50,
            finishes: [
                { name: 'default', variants: [] }
            ]
        },
        {
            tier: 'uncommon',
            weight: 20,
            finishes: [
                { name: 'glossy', variants: ['thick glossy'] },
                { name: 'patterned', variants: ['dotted', 'squared'] }
            ]
        },
        {
            tier: 'rare',
            weight: 10,
            finishes: [
                { name: 'shiny', variants: [] },
                { name: 'monochrome', variants: ['saturated monochrome'] }
            ]
        },
        {
            tier: 'super rare',
            weight: 5,
            finishes: [
                { name: 'foil', variants: ['rainbow foil'] },
                { name: 'phantom', variants: [] },
                { name: 'gradient', variants: ['hyper gradient'] }
            ]
        },
        {
            tier: 'ultra rare',
            weight: 1,
            finishes: [
                { name: 'holographic', variants: [] },
                { name: 'solid gold', variants: ['platinum', 'silver'] }
            ]
        },
        {
            tier: 'hyper rare',
            weight: 0.1,
            finishes: [
                { name: 'pearlescent', variants: [] },
                { name: 'negative', variants: ['negative glitch'] }
            ]
        },
        {
            tier: 'legendary',
            weight: 0.01,
            finishes: [
                { name: 'prismatic', variants: [] }
            ]
        },
        {
            tier: 'hyper legendary',
            weight: 0.001,
            finishes: [
                { name: 'god cell', variants: [] }
            ]
        },
    ]

    const modifierPool = [
        'large',
        'duplicate'
    ]

    const shape = randomFromWeightedPool(shapes.map(s => ({ name: s, weight: 1 })))
    const color = randomFromWeightedPool(colorPool)
    
    const selectedTier = randomFromWeightedPool(finishTiers.map(t => ({ ...t, name: t.tier, weight: t.weight })))
    const finishesInTier = selectedTier.finishes
    const baseFinish = finishesInTier[Math.floor(Math.random() * finishesInTier.length)]

    let variant = null
    if (baseFinish.variants && baseFinish.variants.length > 0 && Math.random() < 0.15) {
        variant = baseFinish.variants[Math.floor(Math.random() * baseFinish.variants.length)]
    }

    const modifiers = pickRandomSubset(modifierPool, 3)

    const name = 'Cell #' + Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    const size = Math.floor(Math.random() * 100) + 1

    return {
        name,
        generation: 1,
        shape: shape.name,
        color: { name: color.name },
        size,
        finish: {
            name: baseFinish.name,
            variant,
            tier: selectedTier.tier
        },
        modifiers,
        history: ['Generated from scratch']
    }
}

module.exports = generateRandomCell;
