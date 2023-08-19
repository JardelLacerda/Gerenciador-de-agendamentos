import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ZodTypeAny } from 'zod';
import AppError from '../error';

const body =
  (schema: ZodTypeAny) =>
  (req: Request, resp: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body)

    return next()
  };

const token = (req: Request, resp: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization

  if (!authorization) throw new AppError('Missing bearer token', 401)

  const [_bearer, token] = authorization.split(' ')

  const decoded = verify(token, process.env.SECRET_KEY!) as JwtPayload

  resp.locals = {
    id: Number(decoded.sub),
    admin: decoded.admin,
  }

  return next();
};

export default { body, token };