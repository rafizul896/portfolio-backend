import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

interface IJwtPayload {
  email: string;
  role: string;
}

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: StringValue | number
): string => {
  const signOptions: SignOptions = {
    expiresIn,
  };

  return jwt.sign(jwtPayload, secret, signOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
