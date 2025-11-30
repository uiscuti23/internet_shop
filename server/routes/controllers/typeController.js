const uuid = require('uuid');
const path = require('path');

const { Type } = require('../../database/schemes');
const ErrorApi = require('../../error/ErrorApi');

class TypeController {
  async create(req, res, next) {
    try {
      const { name, order } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + '.jpg'; // получаем название файла с рандомным id
      img.mv(path.resolve(__dirname, '..', '..', 'static', 'types', fileName)); // перемещаем изображение в папку types
      const type = await Type.create({ name, order, img: fileName });

      return res.json(type);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ErrorApi.badRequest('Не указан Id'));
      }
      const type = await Type.findOne({ where: { id } });
      return res.json(type);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async update(req, res, next) {
    try {
      const type = req.body;
      if (!type.id) {
        return next(ErrorApi.badRequest('Не указан Id'));
      }
      const updatedType = await Type.update(type, { where: { id: type.id } });
      return res.json(updatedType);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ErrorApi.badRequest('Не указан Id'));
      }
      const type = await Type.destroy({ where: { id: id } });
      return res.json(type);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
}

module.exports = new TypeController();

// req = {
//   url: '/',
//   method: 'POST',
//   statusCode: null,
//   statusMessage: null,
//   next: [Function: next],
//   baseUrl: '/api/type',
//   originalUrl: '/api/type',
//   params: {},
//   query: {},
//   body: { name: 'Холодильники' },
//   _body: true,
//   length: undefined,
//   route: Route { path: '/', stack: [ [Layer] ], methods: { post: true } },
// }

// req.files

// type = {
//   dataValues: {
//     id: 1,
//     name: 'Холодильники',
//     updatedAt: 2023-10-18T09:30:00.191Z,
//     createdAt: 2023-10-18T09:30:00.191Z
//   },
//   _previousDataValues: {
//     name: 'Холодильники',
//     id: 1,
//     createdAt: 2023-10-18T09:30:00.191Z,
//     updatedAt: 2023-10-18T09:30:00.191Z
//   },
//   uniqno: 1,
// }
