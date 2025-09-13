import { Request, Response } from 'express';
import { asyncCatcher } from '../../utils/asyncCatcher';

export const checkAuth = asyncCatcher(async (req: Request, res: Response) => {
  // If this middleware is reached, it means the user is authenticated
  // because a previous middleware (e.g., requireRole or a dedicated auth check middleware)
  // would have already verified the token/session and attached user data to req.user.
  if (!req.user) {
    // This case should ideally not be reached if authentication middleware is correctly placed
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.status(200).json({
    message: 'Authenticated',
    user: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
