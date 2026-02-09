import express from "express";
const router = express.Router();
import { authenticateToken } from "../Utilities/utilities.js";
import {
    addNote,
    getAllNotes,
    editNote,
    deleteNote,
    updatePinStatus,
    searchNotes
} from "../controllers/noteController.js";


// Saare routes protected hain
router.post("/add-note", authenticateToken, addNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/update-pin-status/:noteId", authenticateToken, updatePinStatus);
router.get("/search-notes", authenticateToken, searchNotes);

export default router;