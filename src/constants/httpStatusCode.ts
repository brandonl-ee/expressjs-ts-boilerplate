/**
 * HTTP status codes
 */
export const HTTP_STATUS_CODE = {
  /** @code 200 @description The request has succeeded. */
  OK: 200,

  /** @code 201 @description The request has succeeded and a new resource has been created as a result. */
  CREATED: 201,

  /** @code 202 @description The request has been received but not yet acted upon. */
  ACCEPTED: 202,

  /** @code 204 @description There is no content to send for this request, but the headers may be useful. */
  NO_CONTENT: 204,

  /** @code 400 @description The server could not understand the request due to invalid syntax. */
  BAD_REQUEST: 400,

  /** @code 401 @description The client must authenticate itself to get the requested response. */
  UNAUTHORIZED: 401,

  /** @code 403 @description The client does not have access rights to the content. */
  FORBIDDEN: 403,

  /** @code 404 @description The server can not find the requested resource. */
  NOT_FOUND: 404,

  /** @code 405 @description The request method is known by the server but has been disabled and cannot be used. */
  METHOD_NOT_ALLOWED: 405,

  /** @code 409 @description This response is sent when a request conflicts with the current state of the server. */
  CONFLICT: 409,

  /** @code 500 @description The server has encountered a situation it doesn't know how to handle. */
  INTERNAL_SERVER_ERROR: 500,

  /** @code 501 @description The request method is not supported by the server and cannot be handled. */
  NOT_IMPLEMENTED: 501,

  /** @code 502 @description The server, while acting as a gateway or proxy, received an invalid response from the upstream server. */
  BAD_GATEWAY: 502,

  /** @code 503 @description The server is not ready to handle the request. */
  SERVICE_UNAVAILABLE: 503,

  /** @code 504 @description The server, while acting as a gateway or proxy, did not get a response in time. */
  GATEWAY_TIMEOUT: 504,
};
