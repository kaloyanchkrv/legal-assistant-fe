/*
parse_error            400    ParseError
authentication_failed  401    AuthenticationFailed
not_authenticated      401    NotAuthenticated
permission_denied      403    PermissionDenied
not_found              404    NotFound
method_not_allowed     405    MethodNotAllowed
not_acceptable         406    NotAcceptable
unsupported_media_type 415    UnsupportedMediaType
throttled              429    Throttled
*/

export type ErrorCodes =
    | "parse_error"
    | "authentication_failed"
    | "not_authenticated"
    | "permission_denied"
    | "not_found"
    | "method_not_allowed"
    | "not_acceptable"
    | "unsupported_media_type"
    | "throttled"
    | "invalid_login"
    | "invalid_token"
    | "invalid_signup"
    | "payment_failed"
    | "invalid_subscription"
    | "error";

export type CustomErrorArgs = {
    type?: "client_error" | "server_error";
    errors: {
        code: ErrorCodes;
        detail: string;
        attr?: string;
    }[];
};

export class CustomError extends Error {
    readonly status: ErrorCodes;

    constructor(args: CustomErrorArgs) {
        const errorData = args.errors[0];
        super(errorData.detail);
        this.status = errorData.code;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
