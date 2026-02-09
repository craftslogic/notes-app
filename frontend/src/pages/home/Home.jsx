import React, { use, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../utils/contants'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import EmptyCard from '../../components/Empty Card/EmptyCard'
import { IoMdClose } from 'react-icons/io'


export default function Home({ showToastMsgHandler, showToastMsg, CloseToastHandler }) {


  const [notes, setNotes] = useState([])
  const [userInfo, setUserInfo] = useState("");

  const [openAddEditModal, setOpenAddEditModal] = useState({

    isShown: false,
    type: "add",
    data: null

  });

  const [viewNote, setViewNote] = useState({ isShown: false, data: null });


  const handleViewNote = (note) => {
    setViewNote({ isShown: true, data: note });
  };

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString); // DB ki string ko date banaany k lyr

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // searching notes api call!

  const searchHandler = async (query) => {


    if (!query || query.trim() === "") {
      return getAllNotes(); // Agar search khali hai toh saare notes wapas le aao
    }

    try {

      const response = await fetch(`${API_BASE_URL}search-notes?search=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,

        }
      });
      const data = await response.json();
      console.log(data)
      if (response.ok && !data.error) {
        setNotes(data.notes);
      } else {
        console.error("Error searching notes:", data.message);
      }
    }
    catch (error) {
      console.error("Internal Server Error vro!", error);
    }

  }


  //getting user info!
  const getUserInfo = async () => {
    try {
      console.log("Nabeeeel from home")
      const response = await fetch(`${API_BASE_URL}get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        setUserInfo(data.user);
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.error("Error fetching user info:", error);
      localStorage.clear();
      navigate("/login");
    }

  }


  //gettting notes api call
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}get-all-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();

      if (response.ok && !data.error) {
        setNotes(data.notes);

      } else {
        console.error("Error fetching notes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  }



  // deleting notes api call
  const deleteNoteHandler = async (noteId) => {
    try {
      const response = await fetch(`${API_BASE_URL}delete-note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        showToastMsgHandler("Note deleted successfully!", "delete");
        getAllNotes();
      } else {
        console.error("Error deleting note:", data.message);
      }
    } catch (error) {
      console.error("An unexpected server error , plz Try again later!", error);
    }

  }

  //pinning notes api call
  const isPinnedHandler = async (noteId, pinStatus) => {

    try {
      const response = await fetch(`${API_BASE_URL}update-pin-status/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          isPinned: pinStatus
        })
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        showToastMsgHandler(`Note ${pinStatus ? "pinned" : "unpinned"} successfully!`, "add");
        getAllNotes();
      } else {
        console.error("Error pinning/unpinning note:", data.message);
      }
    } catch (error) {
      console.error("An unexpected server error , plz Try again later!", error);
    }

  }


  const editHandler = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: note
    })

  };

  useEffect(() => {

    // searchHandler("");
    getUserInfo();
    getAllNotes();

  }, []);


  return (
    // <div >THis is home component!! </div>
    <>
      <NavBar userInfo={userInfo} searchHandler={searchHandler} isSearchNeeded={true} />

      {notes.length > 0 ? (
        <div className='container mx-auto px-14 py-8 '>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>



            {notes.map((note, index) => (
              <NoteCard key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => editHandler(note)}
                onDelete={() => deleteNoteHandler(note._id)}
                onPinNote={() => { isPinnedHandler(note._id, !note.isPinned) }}
                onViewNotes={() => handleViewNote(note)}
                formatDate={formatDate}
              />
            ))


            }



          </div>

        </div>
      ) : (<EmptyCard setOpenAddEditModal={setOpenAddEditModal} />)}


      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 absolute right-3 bottom-3 hover:bg-blue-700  drop-shadow cursor-pointer transition-all ease-in-out duration-300 fixed '
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null
          })
        }}>


        <MdAdd className='text-[30px] text-white ' />

      </button>


      {/* for adding and editing notes */}
      <Modal

        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
             zIndex: 999,
          },
        }}

        contentLabel=""
        className="w-[40%] max-h-[90%] bg-white rounded mx-auto mt-15 p-5 overflow-auto "
      >

        <AddEditNotes noteData={openAddEditModal.data}
          setOpenAddEditModal={setOpenAddEditModal}
          notes={notes} setNotes={setNotes}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
          showToastMsgHandler={showToastMsgHandler} />

      </Modal>


      {/* for viewing note details */}

      <Modal
        isOpen={viewNote.isShown}
        onRequestClose={() => setViewNote({ isShown: false, data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 999,
          },
        }}
       
        className="w-[90%] md:w-[60%] lg:w-[45%] max-h-[85%] bg-white rounded-lg mx-auto mt-20 p-6 md:p-10 overflow-auto relative shadow-2xl"
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors"
          onClick={() => setViewNote({ isShown: false, data: null })}
        >
          <IoMdClose className="text-2xl hover:cursor-pointer" />
        </button>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-800 break-words">{viewNote.data?.title}</h2>
          <span className="text-[16] text-slate-600">
            {viewNote.data?.createdAt ? formatDate(viewNote.data.createdAt) : ""}
          </span>

          {/* Content Area with Proper Wrapping */}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <div
              className="text-slate-600 text-sm leading-relaxed break-words whitespace-normal quill-content"
              dangerouslySetInnerHTML={{ __html: viewNote.data?.content || "" }}
             
            />
          </div>

          <div className="flex gap-2 mt-6 flex-wrap">
            {viewNote.data?.tags.map((tag, index) => (
              <span key={index} className="text-blue-600 text-xs bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Modal>


      <ToastMessage

        isShown={showToastMsg.isShown}
        message={showToastMsg.msg}
        type={showToastMsg.type}
        onClose={CloseToastHandler}
      />


    </>

  )
}


