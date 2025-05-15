import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let status = 500;
		let message = 'Internal server error';

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse = exception.getResponse();

			if (typeof exceptionResponse === 'string') {
				message = exceptionResponse;
			} else if (
				typeof exceptionResponse === 'object' &&
				exceptionResponse !== null
			) {
				const exceptionObj = exceptionResponse as {
					message?: string;
					error?: string;
				};
				message = exceptionObj.message || message;
			}
		} else {
			message = (exception as Error).message || message;
		}

		response.status(status).json({
			statusCode: status,
			message,
			timestamp: new Date().toISOString(),
		});
	}
}
