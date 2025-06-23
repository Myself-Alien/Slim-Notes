import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function NoteForm({ selectedNote, setSelectedNote, fetchNotes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNote) {
      await axios.put(`http://localhost:5000/api/notes/${selectedNote._id}`, {
        title,
        content,
      });
      setSelectedNote(null);
    } else {
      await axios.post('http://localhost:5000/api/notes', { title, content });
    }
    setTitle('');
    setContent('');
    fetchNotes();
  };

  return (
    <form onSubmit={handleSubmit} className='col-md-4 offset-md-4 mt-2'>
      <h5>{selectedNote ? 'Edit Note' : 'Add Note'}</h5>
      <input
        className='form-control'
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className='form-control mt-2'
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className='d-grid'>
        <button type="submit" className='btn btn-primary mt-2'>{selectedNote ? 'Update' : 'Add'}</button>
        {selectedNote && (
          <button
            type="button"
            className='btn btn-primary mt-2'
            onClick={() => {
              setSelectedNote(null);
              setTitle('');
              setContent('');
            }}
          >
            Cancel
          </button>

        )}
      </div>
    </form>
  );
}
export default NoteForm;
