const {Router} = require('express');
const {createBreedHandler, getBreedsHandler, getBreedsByIdHandler } = require('../handlers/dogsHandlers')


const router = Router();

router.get('/', getBreedsHandler )   
router.get('/:id',  getBreedsByIdHandler)

router.post('/', createBreedHandler)

module.exports = router;