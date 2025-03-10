import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class HttpError extends PrismaClientKnownRequestError {
  constructor(
    message: string,
    public code: string,
    public target?: string[]
  ) {
    super(message, {
      code,
      meta: {
        cause: message,
        target,
      },
      clientVersion: '5.10.0',
    });
  }

  static notFound(message: string, target?: string[]) {
    return new HttpError(message, 'P2025', target);
  }

  static badRequest(message: string, target?: string[]) {
    return new HttpError(message, 'P2002', target);
  }

  static conflict(message: string, target?: string[]) {
    return new HttpError(message, 'P2034', target);
  }
}
