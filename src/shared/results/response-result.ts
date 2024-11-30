export class ResponseResult<T> {
    success: boolean;
    data: T;
    message: string;
  
    constructor(data: T, message = 'Request completed successfully') {
      this.success = true;
      this.data = data;
      this.message = message;
    }
  }
  
  export class ErrorResult {
    success: boolean;
    error: string;
  
    constructor(error: string) {
      this.success = false;
      this.error = error;
    }
  }