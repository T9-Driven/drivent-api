import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService, { SignInParams } from '@/services/authentication-service';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
