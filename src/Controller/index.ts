import express, { Router } from "express";
import { createCharacter, getCharacters, editCharacter, deleteCharacter } from "../Services/characters";
import { createGenre, deleteGenre, editGenre, getGenres} from "../Services/genre";
import { loginUser, registerUser, deleteUser, editUser } from "../Services/user";
import { createMovie, deleteMovie, editMovie, getMovies} from "../Services/movie";
import { verifyToken } from "../Services/verifyToken";

const router = Router();

/* User */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/login", verifyToken, editUser);
router.delete("/login", verifyToken, deleteUser);

/* Characters */
router.get("/characters", verifyToken, getCharacters);
router.post("/characters", verifyToken, createCharacter);
router.put("/characters", verifyToken, editCharacter);
router.delete("/characters", verifyToken, deleteCharacter);

/* Movie */
router.get("/movies", verifyToken, getMovies);
router.post("/movie", verifyToken, createMovie);
router.put("/movie/:id", verifyToken, editMovie);
router.delete("/movie/:id", verifyToken, deleteMovie);

/* Genre */
router.get("/genres", verifyToken, getGenres);
router.post("/genre", verifyToken, createGenre);
router.put("/genre", verifyToken, editGenre);
router.delete("/genre", verifyToken, deleteGenre);



export default router;
