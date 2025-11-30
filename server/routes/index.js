const Router = require('express');
const router = new Router();

const deviceRouter = require('./child_routes/deviceRouter');
const userRouter = require('./child_routes/userRouter');
const brandRouter = require('./child_routes/brandRouter');
const typeRouter = require('./child_routes/typeRouter');
// корзина и рейтинг

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;
