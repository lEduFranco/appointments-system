import { Request, Response, NextFunction } from 'express';

const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    const existRole = roles.includes(role);

    if (existRole) return next();

    return res.status(401).send();
  };
};

export default checkRole;
