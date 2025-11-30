const uuid = require('uuid');
const path = require('path');

const { Brand } = require('../../database/schemes');
const ErrorApi = require('../../error/ErrorApi');

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + '.jpg'; // получаем название файла с рандомным id
      img.mv(path.resolve(__dirname, '..', '..', 'static', 'brands', fileName)); // перемещаем изображение в папку brands
      const brand = await Brand.create({ name, img: fileName });

      return res.json(brand);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
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
      const brand = await Brand.findOne({ where: { id } });
      return res.json(brand);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async update(req, res, next) {
    try {
      const brand = req.body;
      if (!brand.id) {
        return next(ErrorApi.badRequest('Не указан Id'));
      }
      const updatedBrand = await Brand.update(brand, { where: { id: brand.id } });
      return res.json(updatedBrand);
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
      const brand = await Brand.destroy({ where: { id: id } });
      return res.json(brand);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
}

module.exports = new BrandController();
