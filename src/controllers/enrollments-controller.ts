import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    next(error);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { cep } = req.query as Record<string, string>;

  try {
    const address = await enrollmentsService.getAddressFromCEP(cep);
    res.status(httpStatus.OK).send(address);
  } catch (error) {
    next(error);
  }
}
