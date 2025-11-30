require('dotenv').config(); // экспортируем config dotenv (для возможности использования process.env.)

const express = require('express'); // импортируем express
const sequelize = require('./database/db');
const shemes = require('./database/schemes');
const cors = require('cors'); // для возможности отправки запросов с браузера
const fileUpload = require('express-fileupload'); // для возможности получать файлы (изображения)
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()); // для возможности парсить json-формат
app.use(express.static(path.resolve(__dirname, 'static'))); // указываем, что файлы из папки нужно раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static', 'types')));
app.use(express.static(path.resolve(__dirname, 'static', 'brands')));
app.use(express.static(path.resolve(__dirname, 'static', 'devices')));
app.use(fileUpload({}));
app.use('/api', router);

// мидлвейр, отвечающий за показ ошибок, должен идти в самом конце!
// так как, это последний мидлвейр, мы не вызываем у него функцию next(), поскольку на нем прекращается цепь мидлвейров
app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'WORKING!!!' });
// });

const start = async () => {
  try {
    await sequelize.authenticate(); // подключение к базе данных
    await sequelize.sync(); // сверка состояния базы данных со схемой описываемых данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
