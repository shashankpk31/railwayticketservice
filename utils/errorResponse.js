class ErrorResponse extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors; // Include an array for validation errors

        // Enhance stack trace information
        if (process.env.NODE_ENV !== 'production') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            // Customize for production environments if needed
            this.stack = `${this.name}: ${this.message}`;
        }
    }

    toJSON() {
        // Customize response for JSON serialization
        return {
            message: this.message,
            statusCode: this.statusCode,
            errors: this.errors
        };
    }
}

module.exports = ErrorResponse;