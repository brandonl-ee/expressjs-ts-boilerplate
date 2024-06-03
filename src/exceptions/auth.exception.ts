export default class AuthenticationError extends Error {
  data: any;
  constructor(message: string = 'Unable to authenticate.', data: any = null) {
    super(message);
    this.name = 'AuthenticationError';
    this.data = data;
  }
}
export { AuthenticationError };
