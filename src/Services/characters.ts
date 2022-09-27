import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import characters from "../../data/Characters.json";
require("dotenv").config();
const { Op } = require("sequelize");
const { Character, Movie } = require("../db");

const { CLAVE_TOKEN } = process.env;

interface Parameters {
  attributes: Array<String>;
  include?: Object;
  where: {
    name?: string;
    age?: number;
    idMovie?: number;
    weight?: string;
  };
}

const getCharacters = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, CLAVE_TOKEN || "tokenTest");

    const { name, age, idMovie } = req.query;

    (() => {
      characters.forEach(async (element) => {
        await Character.findOrCreate({
          where: {
            image: element.image,
            name: element.name,
            age: element.age,
            weight: element.weight,
            history: element.history,
          },
        });
      });
    })();

    let parameters: Parameters = {
      attributes: ["id", "name", "image"],
      where: {},
    };

    if (name) {
      parameters.attributes = [
        "id",
        "name",
        "image",
        "weight",
        "age",
        "history",
      ];
      parameters.include = {
        model: Movie,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      };
      parameters.where.name = name;
    } else if (age) {
      parameters.attributes = [
        "id",
        "name",
        "image",
        "weight",
        "age",
        "history",
      ];
      parameters.include = {
        model: Movie,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      };
      parameters.where.age = age;
    } else if (idMovie) {
      let searchIdMovie = await Movie.findAll({
        where: { id: idMovie },
        attributes: [],
        through: {
          attributes: [],
        },
        include: {
          model: Character,
          attributes: ["id", "name", "image", "weight", "age", "history"],
          through: {
            attributes: [],
          },
          include: {
            model: Movie,
            attributes: ["title"],
            through: {
              attributes: [],
            },
          },
        },
      });
      return res.status(200).json({
        mensaje: "Personajes encontrados",
        characters: searchIdMovie[0].characters,
      });
    }

    let allCharacters = await Character.findAll(parameters);

    return res.status(200).json({
      mensaje: "All characters",
      characters: allCharacters,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error to get Characters" });
  }
};

const createCharacter = async (req: Request, res: Response) => {
  try {
    const { image, name, age, history } = req.body;
    if (!image || !name || !age || !history) {
      res.status(400).json({
        mensaje: "Debe colocar Image, Name, Age e History",
      });
    }
    let characterExist = await Character.findOne({
      where: {
        name,
      },
    });
    if (characterExist)
      return res.status(400).json({
        mensaje: "El personaje ya existe",
      });

    let createNewCharacter = await Character.create({
      image,
      name,
      age,
      history,
    });

    return res.status(200).json({
      mensaje: "Personaje creado correctamente",
      character: createNewCharacter,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to create Character" });
  }
};

const editCharacter = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { image, name, age, history } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensaje: "El di tiene que ser un numero",
      });
    } else if (!image || !name || !age || !history) {
      return res.status(400).json({
        mensaje: "Debe colocar title, date, image y history",
      });
    }

    let editMovie = await Character.update(
      {
        image,
        name,
        age,
        history,
      },
      {
        where: { id },
      }
    );

    if (!editMovie) {
      return res.status(400).json({
        mensaje: "El personaje no se encontro",
      });
    }

    res.status(200).json({
      mensaje: "Personaje editado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to edit Character" });
  }
};

const deleteCharacter = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        mensaje: "El di tiene que ser un numero",
      });
    }

    const characterDeleted = await Character.destroy({
      where: { id },
    });

    if (!characterDeleted) {
      return res.status(400).json({
        mensaje: "El personaje no se encuentra!",
      });
    }

    res.status(200).json({
      mensaje: "Personaje eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to delete Character" });
  }
};




export { getCharacters, createCharacter, editCharacter, deleteCharacter };
