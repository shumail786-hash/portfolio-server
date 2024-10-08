class ApiError {
  constructor(statusCode, message, success) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}

export { ApiError };
