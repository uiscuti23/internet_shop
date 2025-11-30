const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../../middleware/AuthMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

router.get('/', userController.getAll);
router.get('/:email', userController.getOne);
router.put('/change', userController.update);
router.delete('/:email', userController.delete);

module.exports = router;
