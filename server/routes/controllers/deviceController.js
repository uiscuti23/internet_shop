const uuid = require('uuid'); // генерация случайных паролей
const path = require('path');
const { Device, DeviceInfo } = require('../../database/schemes');
const ErrorApi = require('../../error/ErrorApi');

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg'; // получаем название файла с рандомным id
      img.mv(path.resolve(__dirname, '..', '..', 'static', fileName)); // перемещаем изображение в папку static

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        info = JSON.parse(info);
        info.forEach(i =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;

      page = page || 1;
      limit = limit || 9;

      let offset = (page - 1) * limit;

      let devices;

      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
      }
      return res.json(devices);
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
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });
      return res.json(device);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async update(req, res, next) {
    try {
      const post = req.body;
      if (!post.id) {
        return next(ErrorApi.badRequest('Не указан Id'));
      }
      const updatedPost = await Device.update(post, { where: { id: post.id } });
      return res.json(updatedPost);
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
      const post = await Device.destroy({ where: { id: id } });
      return res.json(post);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
}

module.exports = new DeviceController();
