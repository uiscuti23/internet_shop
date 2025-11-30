class ErrorApi extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ErrorApi(400, message);
  }

  static unauthorized(message) {
    return new ErrorApi(401, message);
  }

  static forbidden(message) {
    return new ErrorApi(403, message);
  }

  static internal(message) {
    return new ErrorApi(500, message);
  }
}

module.exports = ErrorApi;

// 404 - клиент был в состоянии общаться с сервером,
// но сервер не может найти данные согласно запросу

// 500 - указывает на то, что сервер столкнулся с неожиданной ошибкой,
// которая помешала ему выполнить запрос

// 403 -  доступ к запрошенному ресурсу запрещен.
// Сервер понял запрос, но не выполнит его.
