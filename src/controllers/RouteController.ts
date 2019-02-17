import {ApiError, NotLoggedInError} from '../api/errors';

export default class RouteController {

    public static handlePromise(requestHandler: (req, res) => Promise<any>): (req, res) => Promise<void> {
        return async (req, res) => {
            try {
                const result = await requestHandler(req, res);
                if (result.__redirect) {
                    res.redirect(result.url);
                    return;
                }
                res.send(result);
            } catch (e) {
                this.handleError(e)(req, res);
            }
        };
    }

    public static handleError(error: ApiError) {
        return (req, res) => {
            const code = error.code || 'server_error';
            const status = error.status || 500;

            res.status(status).send({
                code,
                message: error.message,
                trace: this.shouldIncludeStackTrace() ? error.stack : undefined
            });
        }
    }

    private static shouldIncludeStackTrace(): boolean {
        return true;
    }

}