import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: Prisma.PrismaClientKnownRequestError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
