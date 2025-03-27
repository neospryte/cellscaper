const express = require('express')
const router = express.Router()
const Cell = require('../models/Cell')
const generateRandomCell = require('../utils/generateRandomCell')


router.post('/generate', async (req, res) => {
    const newCell = generateRandomCell()
    const saved = await new Cell(newCell).save()
    res.json(saved)
})

router.get('/', async (req, res) => {
    const cells = await Cell.find().sort({ createdAt: -1})
    res.json(cells)
})

module.exports = router
