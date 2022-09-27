import express, { Router } from "express";
import { createCharacter, getCharacters, editCharacter, deleteCharacter } from "../Services/characters";
import { createGenre, deleteGenre, editGenre, getGenres} from "../Services/genre";
import { loginUser, registerUser, deleteUser, editUser } from "../Services/user";
import { verifyToken } from "../Services/verifyToken";

const router = Router();

/* User */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* Characters */
router.get("/characters", verifyToken, getCharacters);
router.post("/characters", verifyToken, createCharacter);
router.put("/characters", verifyToken, editCharacter);
router.delete("/characters", verifyToken, deleteCharacter);

export default router;
