class ApiError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}

class BadRequestException extends ApiError {
  constructor(message){
    super(message, 400)
  }
};

class UnauthorizedException extends ApiError {
  constructor(message){
    super(message, 401)
  }
}

class ForbiddenException extends ApiError {
  constructor(message){
    super(message, 403)
  }
}

class NotFoundException extends ApiError {
  constructor(message){
    super(message, 404)
  }
};

class ConflictException extends ApiError {
  constructor(message){
    super(message, 409)
  }
};

class InternalServerErrorException extends ApiError {
  constructor(message){
    super(message, 500)
  }
};


module.exports = {
  ApiError,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException
}
