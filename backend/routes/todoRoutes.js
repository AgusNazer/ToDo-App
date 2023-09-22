const { Router } = require('express');

const router = Router()

router.get('/', (req, res) => {
    res.json({
        messagge: 'Testing route'
    })
})

module.exports = router;