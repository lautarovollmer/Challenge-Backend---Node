import express, { Response, Request } from "express";
const { Character, Movie } = require("../db");
import jwt from "jsonwebtoken";
import characters from "../../data/Characters.json";
import movies from "../../data/Movies.json";

const getPersonajes = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, "secretkey");

    characters.forEach(async (element) => {
      await Character.findOrCreate({
        where: {
          image: element.image,
          name: element.name,
          age: element.age,
          history: element.history,
        },
      });
    });
    let allCharacters = await Character.findAll({
      attributes: ["id", "name", "image"],
    });
    return res.status(200).json(allCharacters);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error to get Characters");
  }
};

const createCharacter = async (req: Request, res: Response) => {
  try {
    const { image, name, age, history } = req.body;
    let characterExist = await Character.findOne({
      where: {
        name: name,
      },
    });
    if (characterExist) return res.status(400).json("El personaje ya existe");
    return res.status(200).json({ image, name, age, history });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensaje: "Error to create Character" });
  }
};

export { getPersonajes, createCharacter };
