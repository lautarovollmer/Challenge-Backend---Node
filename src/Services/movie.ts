import express, { Response, Request } from "express";
const { Character, Movie, Genre } = require("../db");
require("dotenv").config();
const { CLAVE_TOKEN } = process.env;
import movies from "../../data/Movies.json";


interface Parameters {
    attributes: Array<String>;
    include?: Array<Object>;
    where: {
      title?: string;
      genre?: number;
    };
    order?: [Array<String>];
  }

 
const getMovies = async (req: any, res: Response) => {
    try {
      const { title, genre, order } = req.query;
  
      let parameters: Parameters = {
        attributes: ["id", "title", "date", "image"],
        where: {},
      };
  
      if (title) {
        parameters.include = [
          {
            model: Character,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ];
        parameters.where.title = title;
      } else if (genre) {
        let findGenre = await Genre.findAll({
          where: { name: genre },
          attributes: [],
          through: {
            attributes: [],
          },
          include: {
            model: Movie,
            attributes: ["id", "title", "date", "image"],
            through: {
              attributes: [],
            },
            include: {
              model: Character,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          },
        });
        return res.status(200).json({
          mensaje: "Movies not found",
          movies: findGenre[0].movies,
        });
      } else if (order) {
        parameters.order = [["title", order]];
      }
  
      const allMovies = await Movie.findAll(parameters);
  
      res.status(200).json({
        mensaje: "All the movies!",
        Peliculas: allMovies,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to get Movies!" });
    }
  };
  
  const createMovie = async (req: any, res: Response) => {
    try {
      const { image, title, date, Characters, Genres } = req.body;
  
      if (!title || !date || !image) {
        return res.status(400).json({
          mensaje: "Put the title, date and image",
        });
      }
  
      const movieExist = await Movie.findOne({
        where: {
          title,
        },
      });
  
      if (movieExist) {
        return res.status(400).json({
          mensaje: "The movie already exist",
        });
      }
  
      const newMovie = await Movie.create({
        image,
        title,
        date,
      });
  
      Characters.forEach(async (element: string) => {
        const movieCharacter = await Character.findOne({
          where: {
            name: element,
          },
        });
        newMovie.addCharacters(movieCharacter);
      });
  
      Genres.forEach(async (element: string) => {
        const movieGenre = await Genre.findOne({
          where: {
            name: element,
          },
        });
        newMovie.addGenres(movieGenre);
      });
  
      res.status(200).json({
        mensaje: "Successfully created movie!",
        Movie: newMovie,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to create Movie" });
    }
  };
  
  const editMovie = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { title, date, image } = req.body;
  
      if (isNaN(id)) {
        return res.status(400).json({
          mensaje: "The id has to be a number",
        });
      } else if (!title || !date || !image) {
        return res.status(400).json({
          mensaje: "Must place title, date and image",
        });
      }
  
      let editMovie = await Movie.update(
        {
          title,
          date,
          image,
        },
        {
          where: { id },
        }
      );
  
      if (!editMovie[0]) {
        return res.status(400).json({
          mensaje: "Movie not found",
        });
      }
  
      res.status(200).json({
        mensaje: "Edited movie succesfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to edit Movie" });
    }
  };
  
  const deleteMovie = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
  
      if (isNaN(id)) {
        return res.status(400).json({
          mensaje: "The id has to be a number",
        });
      }
  
      const movieDeleted = await Movie.destroy({
        where: { id },
      });
  
      if (!movieDeleted) {
        return res.status(400).json({
          mensaje: "Movie not found",
        });
      }
  
      res.status(200).json({
        mensaje: "Movie removed successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: "Error to delete Movie" });
    }
  };
  
  export { getMovies, createMovie, editMovie, deleteMovie };