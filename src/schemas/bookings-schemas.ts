import Joi from 'joi';
import { StoreBookingSchemaBody, UpdateBookingSchemaBody } from '@/protocols';

export const StoreBookingSchema = Joi.object<StoreBookingSchemaBody>({
  roomId: Joi.number().required(),
});

export const UpdateBookingSchema = Joi.object<UpdateBookingSchemaBody>({
  roomId: Joi.number().required(),
});
