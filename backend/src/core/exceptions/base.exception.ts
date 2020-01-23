import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

export interface InternalErrorFormat {
    message: string;
    name: string;
    statusCode: HttpStatus;
}

export class InternalError extends Error {
    protected statusCode: HttpStatus;
    protected key: string;

    constructor(message: string, key: string, statusCode: HttpStatus) {
        super(message);
        this.statusCode = statusCode;
        this.key = key;
    }
}

export const internalFormatError = (err: GraphQLError) => {
    const originalError: any = err.originalError;
    return {
        key: originalError.key || undefined,
        message: originalError.message.error || originalError.message || 'An error was found.',
        status: originalError.statusCode || originalError.status || HttpStatus.INTERNAL_SERVER_ERROR,
    };
};
