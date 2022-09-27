import express, { Response, Request } from "express";
const { Character, Movie, Genre} = require("../db");
require("dotenv").config();
const { CLAVE_TOKEN } = process.env;
import genres from "../../data/Genre.json";

const getGenres = async (req: any, res: Response) => {
    try {
      (() => {
        genres.forEach(async (element) => {
          await Genre.findOrCreate({
            where: {
              name: element.name,
              image: element.image,
            },
          });
        });
      })();
  
      const allGenres = await Genre.findAll({
        attributes: ["id", "name", "image"],
      });
  
      res.status(200).json({
        mensaje: "All genres!",
        Generos: allGenres,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to get Genres" });
    }
  };
  const getGenreById = async (req: any, res: Response) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to get Genre" });
    }
  };
  const createGenre = async (req: any, res: Response) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to create Genre" });
    }
  };
  const editGenre = async (req: any, res: Response) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to edit Genre" });
    }
  };
  const deleteGenre = async (req: any, res: Response) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to delete Genre" });
    }
  };

  export { getGenres, getGenreById, createGenre, editGenre, deleteGenre };