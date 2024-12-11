import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateNewToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.status(403).json({ message: 'Refresh token missing' });

  try {
    const payload: any = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string);
    const newAccessToken = jwt.sign({ userId: payload.userId, email: payload.email, companyId: payload.companyId }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRY,  // Adjust expiration as needed
    });
    return res
      .status(200)
      .header('Authorization', newAccessToken)
      .json({ message: 'Token updated' })
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token expired, please log in again' });
    }
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}

export const logout = (req: Request, res: Response) => {
  res.status(200).clearCookie('refreshToken').json({ message: 'Logged out successfully' });
}