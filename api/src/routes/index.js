const { Router } = require("express");
//Importar los routers

const dogs = require('./dogs');
const dog = require('./dog');
const temperament = require('./temperament');

const router = Router();

//configurar los routers
router.use('/dogs', dogs);
router.use('/temperament', temperament);
router.use('/dog', dog);


module.exports = router;