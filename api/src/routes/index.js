const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RouterDogs = require('./routerDog');
const RouTemperaments = require('./routerTempe');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', RouterDogs);
router.use('/temperaments', RouTemperaments)


module.exports = router;
