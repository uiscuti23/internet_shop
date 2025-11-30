const ErrorApi = require('../../error/ErrorApi');
const bcrypt = require('bcrypt'); // для хеширования паролей, чтобы не хранить их в открытом виде
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../../database/schemes');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email) {
      return next(ErrorApi.badRequest('Некорректный email'));
    }
    if (!password) {
      return next(ErrorApi.badRequest('Некорректный password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ErrorApi.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5); // будем хешировать пароль 5 раз
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ErrorApi.badRequest('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password); // сравниваем пароль введенный пользователем и пароль в базе данных
    if (!comparePassword) {
      return next(ErrorApi.forbidden('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const user = req.user;
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      users.forEach(user => (user.password = ''));
      return res.json(users);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async getOne(req, res, next) {
    try {
      const { email } = req.params;
      if (!email) {
        return next(ErrorApi.badRequest('Не указан email'));
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ErrorApi.badRequest('Пользователь не найден'));
      }
      return res.json(user);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async update(req, res, next) {
    try {
      const data = req.body;
      const email = data.email;
      if (!email) {
        return next(ErrorApi.badRequest('Не указан email'));
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ErrorApi.forbidden('Пользователь с таким email не найден'));
      }

      if (data.newEmail) {
        data.email = data.newEmail;
        delete data.newEmail;
      }
      const updatedUser = await User.update(data, { where: { id: user.id } });

      return res.json(updatedUser);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { email } = req.params;
      if (!email) {
        return next(ErrorApi.badRequest('Не указан email'));
      }
      const user = await User.destroy({ where: { email } });
      if (user === 0) {
        return next(ErrorApi.badRequest('Пользователя с таким email не существует'));
      }
      return res.json(user);
    } catch (err) {
      next(ErrorApi.badRequest(err.message));
    }
  }
}

module.exports = new UserController();
