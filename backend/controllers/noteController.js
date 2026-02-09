import { Note } from "../models/note-model.js";

// Add Note
export const addNote = async (req, res) => {
   

    try {
        const { title, content, tags } = req.body;

        const user = req.user;
        console.log("user in add note route:", user.user._id);

        if (!title) {
            return res.status(400).json({ error: true, message: "Note title is required!" })
        }
        if (!content) {
            return res.status(400).json({ error: true, message: "Note content is required!" })
        }

        console.log("helloo before new note created")

        const newNote = new Note({
            title,
            content,
            tags: tags || [],
            userId: user.user._id
        });

        console.log("helloo after new note created")
        console.log(newNote)

        await newNote.save();

        console.log("after saving new note")

        return res.status(201).json({
            error: false,
            newNote,
            message: "Note added successfully!"
        });


    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error bro!!" });
    
}
};

// Get All Notes
export const getAllNotes = async (req, res) => {
    try {
        const { user } = req.user;
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1, createdAt: -1  });
        console.log(notes)

        return res.status(200).json({
            error: false,
            notes,
            message: "All the Notes fetched successfully!"
        });

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error while fetching notes!" });
    }
};

// Edit Note
export const editNote = async (req, res) => {
    try {
        console.log("edit notesssss")
        const noteId = req.params.noteId;
        const { title, content, tags, isPinned } = req.body;
        const { user } = req.user;
        console.log(user)

        if (!title && !content && !tags) {
            return res.status(400).json({ error: true, message: "At least one field (title, content, tags) is required to update!" });
        }

        const note = await Note.findOne({ _id: noteId, userId: user._id });
        console.log(note)

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note updated successfully!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while editing note!" });
    }
};

// Delete Note
export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { user } = req.user;
        const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found or already deleted!" });
        }



        return res.status(200).json({
            error: false,
            message: "Note deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while deleting note!" });
    }
};

// Update Pin Status
export const updatePinStatus = async (req, res) => {
      try {
        const noteId = req.params.noteId;
        const { isPinned } = req.body;
        const { user } = req.user;



        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found!" });
        }

        if (isPinned !== undefined) note.isPinned = isPinned;
        else {
            note.isPinned = !note.isPinned;
        }

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note pinned status updated successfully!"
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while updating pin status!" });
    }
};

// Search Notes
export const searchNotes = async (req, res) => {
    console.log("search Nabeel")
    try {
        const { user } = req.user;
        const { search } = req.query;
        console.log(user)

        console.log("search==" , search)

        if (!search) {
            return res.status(400).json({ error: true, message: "Search query is required!" });
        }

        const notes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ]
        });

        return res.status(200).json({
            error: false,
            notes,
            message: "Notes matching the search query retrieved successfully!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while searching notes!" });
    }
};