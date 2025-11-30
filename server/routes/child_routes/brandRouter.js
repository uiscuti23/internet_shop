const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../../middleware/CheckRoleMiddleware');

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getOne);
router.put('/', brandController.update);
router.delete('/:id', brandController.delete);

module.exports = router;
