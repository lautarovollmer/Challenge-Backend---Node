import express, { Response, Request, NextFunction } from "express";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers["authorization"];

    if (typeof bearer !== "undefined") {
      const bearerToken = bearer.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      return res.status(403).json({ mensaje: "Token no valido" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { verifyToken };
