export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = cause.statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServicesError extends Error {
  constructor({ message, cause }) {
    super(message || "Ocorreu um erro de serviço.", {
      cause,
    });

    this.name = "ServicesError";
    this.action = "Verifique a disponibilidade do serviço";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");

    this.name = "MethodNotAllowedError";
    this.action = "Verifique se o método HTTP enviado para esse endpoint.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
