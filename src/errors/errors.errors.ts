class AppError extends Error {
    status: number;
  
    constructor(message: string, status: number = 400) {
      super(message);
      this.status = status;
    }
  }
  
  class NotFound extends AppError {
    constructor(message: string, status: number) {
      super(message, 404);
      this.status = status;
    }
  }
  
  class Conflict extends AppError {
    constructor(message: string, status: number) {
      super(message, 409);
      this.status = status;
    }
  }
  class Unauthorized extends AppError {
    constructor(message: string, status: number) {
      super(message, 401);
      this.status = status;
    }
  }
  
  export default { AppError, NotFound, Conflict, Unauthorized };
  
  