import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import './App.css';
import Footer from './Footer';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Get All Notes
  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Delete Note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className='App container-fluid g-0'>
    <h1>Slim Notes</h1>
      <NoteForm
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        fetchNotes={fetchNotes}
      />
      <div className="container">
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4 col-sm-6 mt-3" key={note._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.content}</p>
                  <small className="text-muted">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setSelectedNote(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
    
  );
}
export default App;
