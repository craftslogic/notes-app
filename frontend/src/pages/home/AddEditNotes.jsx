import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md'
import { API_BASE_URL } from '../../utils/contants'

// Rich Text Editor Imports
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css';

export default function AddEditNotes({ noteData, setOpenAddEditModal, notes, setNotes, type, getAllNotes, showToastMsgHandler }) {

    const [tags, setTags] = useState(noteData ? noteData.tags : [])
    const [content, setContent] = useState(noteData ? noteData.content : "")
    const [title, setTitle] = useState(noteData ? noteData.title : "")
    const [error, setError] = useState("")

    // Editor Customization (VIP Look)
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    const closeModalHandler = () => {
        setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null
        })
    }

    const addNote = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}add-note`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, content, tags })
            });
            const data = await response.json();
            if (response.ok && !data.error) {
                showToastMsgHandler("Note added successfully!", "add");
                getAllNotes();
                closeModalHandler();
            } else {
                setError(data.message || "Failed to add note.");
            }
        } catch (error) {
            setError("Internal server error while adding notes.");
        }
    };

    const editNote = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}edit-note/${noteData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, content, tags })
            });
            const data = await response.json();
            if (response.ok && !data.error) {
                showToastMsgHandler("Note updated successfully!", "edit");
                getAllNotes();
                closeModalHandler();
            } else {
                setError(data.message || "Failed to edit note.");
            }
        } catch (error) {
            setError("Internal server error while editing notes.");
        }
    };

    const handleAddEditNotes = () => {
        if (!title) {
            setError("Please enter the title!!");
            return;
        }

        // Quill check: Khali editor <p><br></p> bhejta hai
        if (!content || content === '<p><br></p>') {
            setError("Please enter the content!!");
            return;
        }

        setError("");

        if (type === "add") {
            addNote();
        } else if (type === "edit") {
            editNote();
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-2 '>
                <div className='flex items-center w-full justify-between cursor-pointer text-sm'>
                    <label className='text-xs text-slate-400 '>TITLE:</label>
                    <MdClose className='cursor-pointer text-[20px] text-slate-400 hover:text-black'
                        onClick={closeModalHandler} />
                </div>
                <input
                    type="text"
                    className='text-2xl text-slate-950 outline-none '
                    placeholder='Go to give tutions from 6pm'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Replaced textarea with ReactQuill */}
            <div className='flex flex-col gap-2 mt-3'>
                <label className='text-xs text-slate-400 '>CONTENT:</label>
                <div className="bg-slate-50">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent} // Direct value update
                        modules={modules}
                        placeholder="Content..."
                        className="text-sm text-slate-950 outline-none"
                    />
                </div>
            </div>

            <div className='mt-10'> {/* Tags ko thora niche kiya toolbar ki wajah se */}
                <label className='text-xs text-slate-400'>Tags:</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-sm mt-1.5 '>{error}</p>}

            <button className='bg-blue-600 font-medium mt-3.5 p-3 w-full text-sm border text-white rounded hover:bg-blue-700 transition-all duration-300 cursor-pointer'
                onClick={handleAddEditNotes}>
                {type === "add" ? "Add" : "Update Note"}
            </button>
        </div>
    )
}
