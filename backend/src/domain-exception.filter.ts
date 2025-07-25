import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from './domain/exceptions/domain.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      message: exception.message,
      error: 'Unprocessable Entity',
    });
  }
}
