const sanitizer = require('sanitize')();

export class ApiError extends Error {
    protected _status: number;
    protected _code: string;

    constructor(status: number = 500, code?: string, message?: string) {
        super();
        this._status = sanitizer.value(status, 'int');
        this._code = code;
        this.message = message;
    }

    get status() {
        return this._status;
    }

    get code() {
        return this._code;
    }
}

export class InvalidAuthError extends ApiError {
    constructor(message: string = '') {
        super(401, 'invalid_auth_error', message);
    }
}

export class NotLoggedInError extends ApiError {
    constructor(message: string = '') {
        super(401, 'not_logged_in_error', message);
    }
}

export class BadRequestError extends ApiError {
    constructor(code: string, message?: string) {
        super(400, code, message);
    }
}