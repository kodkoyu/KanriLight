export class ResponseResult<T> {
    success: boolean;
    data: T;
    message: string;
  
    constructor(data: T, message = 'Success') {
      this.success = true;
      this.message = message;
      this.data = data;
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