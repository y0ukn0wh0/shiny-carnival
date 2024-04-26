import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { BASE_URI } from "../App";
import { timeAgo } from "../utils/timeAgo";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Adjust the width as needed
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  largeIcon: {
    width: 60,
    height: 60,
  },
};

function ListButton({ title, onClick, created, modified }) {
  return (
    <Tooltip
      title={`Created: ${timeAgo(created)}\nLast Modified: ${timeAgo(
        modified
      )}`}
      enterDelay={500}
      leaveDelay={200}
      arrow
      sx={{}}
    >
      <button
        className="px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200 transition-colors duration-200"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
        </div>
      </button>
    </Tooltip>
  );
}

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const { token, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${BASE_URI}` + "notes/", {
          headers,
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setOpenModal(true);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNote(null);
    setEditTitle("");
    setEditContent("");
    setNewTitle("");
    setNewContent("");
  };

  const handleEditNote = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      await axios.put(
        `${BASE_URI}notes/${selectedNote.id}/`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers,
        }
      );
      const response = await axios.get(`${BASE_URI}` + "notes/", {
        headers,
      });
      setNotes(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const handleCreateNote = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      await axios.post(
        `${BASE_URI}notes/`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers,
        }
      );
      const response = await axios.get(`${BASE_URI}` + "notes/", {
        headers,
      });
      setNotes(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedNote ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Note
              </Typography>
              <TextField
                id="edit-title"
                label="Title"
                variant="outlined"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                id="edit-content"
                label="Content"
                variant="outlined"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button onClick={handleEditNote}>Save</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Note
              </Typography>
              <TextField
                id="new-title"
                label="Title"
                variant="outlined"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                id="new-content"
                label="Content"
                variant="outlined"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button onClick={handleCreateNote}>Create</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </>
          )}
        </Box>
      </Modal>
      <div>
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-md rounded-lg p-4">
            {notes.map((note, index) => (
              <ListButton
                key={index}
                title={note.title}
                onClick={() => handleOpenModal(note)}
                created={note.created_at}
                modified={note.last_modified}
              />
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => setOpenModal(true)}>
        <NoteAddIcon style={style.largeIcon}></NoteAddIcon>
      </Button>
    </div>
  );
}

export default Dashboard;
