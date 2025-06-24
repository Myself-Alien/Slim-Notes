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
    <div className='container-fluid g-0'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h1 className='roboto_bold'>Slim Notes</h1>
          </div>
          <div className='col-md-6'>
            <button type="button" classNameName="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* 
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            */}
              <div className="modal-body">
                <NoteForm
                  selectedNote={selectedNote}
                  setSelectedNote={setSelectedNote}
                  fetchNotes={fetchNotes}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4 col-sm-6 mt-3" key={note._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title roboto_light">{note.title}</h5>
                  <p className="card-text roboto_light">{note.content}</p>
                  <small className="text-muted">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>
                  <div className="mt-3">

                    <button
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
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
