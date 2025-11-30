const Router = require('express');
const router = new Router();
const deviceRouter = require('../controllers/deviceController');
const checkRole = require('../../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceRouter.create);
router.get('/', deviceRouter.getAll);
router.get('/:id', deviceRouter.getOne);
router.put('/', checkRole('ADMIN'), deviceRouter.update);
router.delete('/:id', checkRole('ADMIN'), deviceRouter.delete);

module.exports = router;
