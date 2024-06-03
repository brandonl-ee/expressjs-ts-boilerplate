export default class CustomError extends Error {
  data: any;
  code: number;
  constructor(message: string = 'Internal Server Error', code: number = 500, data: any = null) {
    super(message);
    this.name = 'CustomError';
    this.data = data;
    this.code = code;
  }
}
export { CustomError };
