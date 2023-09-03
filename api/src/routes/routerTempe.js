const {Router} = require('express');
const {getTemperamentsHandlers} = require('../handlers/tempeHandlers')

const router = Router();

router.get('/', getTemperamentsHandlers )

module.exports = router;