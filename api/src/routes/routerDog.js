const {Router} = require('express');
const {createBreedHandler,   getBreedsByIdHandler, getBreedsHandler } = require('../handlers/dogsHandlers')

const router = Router();

router.get('/', getBreedsHandler )   
router.get('/:id',  getBreedsByIdHandler)

router.post('/', createBreedHandler)

module.exports = router;