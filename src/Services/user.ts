import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { User } = require("../db");

const { CLAVE_TOKEN, CLAVE_HASH, SENDGRID_API_KEY, MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, mail, password } = req.body;
    if (!name || !mail || !password) {
      return res
        .status(400)
        .json({ mensaje: "Debe colocar Name, Mail y una Password" });
    }
    const passwordHash = await bcryptjs.hash(password, 5);
    let userExistent = await User.findOne({
      where: {
        mail: mail,
      },
    });

    if (userExistent) {
      return res.status(400).json({
        mensaje: "Mail already use",
      });
    }

    await User.findOrCreate({
      where: {
        name: name,
        mail: mail,
        password: passwordHash,
      },
    });

    await sgMail.send({
      to: mail,
      from: MAIL,
      subject:
        "Usuario registrado correctamente para la API REST de la prueba de Alkemy!",
      text: "Mail registrado con exito! Puede usar la api sin problemas!",
    });

    console.log("El mail se envio");

    return res.status(200).json({
      mensaje: "User registed!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Error to register User",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res
        .status(400)
        .json({ mensaje: "Debe colocar una contraseña o un mail valido" });
    }

    const user = await User.findOne({
      where: {
        mail: mail,
      },
    });

    const passwordCorrect = await bcryptjs.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return res.status(400).json({ mensaje: "Mail o contraseña incorrecto" });
    }

    jwt.sign(
      { user: user },
      CLAVE_TOKEN || "tokenTest",
      (error: any, token: any) => {
        res.status(200).json({
          mensaje: "Logeado correctamente!",
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to login User" });
  }
};

const editUser = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to edit User" });
  }
};

const deleteUser = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to delete User" });
  }
};

export { registerUser, loginUser, editUser, deleteUser };