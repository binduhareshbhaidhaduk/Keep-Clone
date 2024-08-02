import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { GoFileSubmodule } from 'react-icons/go';
import { LuPin } from 'react-icons/lu';
import {
  MdAddPhotoAlternate, MdColorLens, MdCheckBoxOutlineBlank, MdOutlineArchive,
  MdMoreVert, MdOutlineEdit, MdDeleteOutline
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, deleteNote, getNotes, singleRec, updateNote, uploadImage } from '../../Services/Action/KeepAction';

const NoteApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const { notes, singleNote } = useSelector(state => state.KeepReducer);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleEdit = (id) => {
    dispatch(singleRec(id));
    setEditingId(id);
  };
  
  useEffect(() => {
    if (singleNote) {
      setNote(singleNote); // Make sure `singleNote` is updated with data
      setIsExpanded(true);
    }
  }, [singleNote]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateNote(editingId, note));
      setEditingId(null);
    } else {
      if (imageFile) {
        try {
          const imageURL = await dispatch(uploadImage(imageFile));
          note.imageURL = imageURL;
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
      dispatch(addNotes(note));
    }
    setNote({ title: '', description: '' });
    setIsExpanded(false);
    setImageFile(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="note-app">
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Take a note..."
          onFocus={() => setIsExpanded(true)}
          value={note.title || ''}
          onChange={handleInputChange}
          name="title"
        />
        {isExpanded && (
          <>
            <textarea
              placeholder="Description"
              value={note.description || ''}
              onChange={handleInputChange}
              name="description"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="note-icons">
              <button type="submit">
                <GoFileSubmodule />
              </button>
              <MdAddPhotoAlternate />
              <MdColorLens />
              <MdCheckBoxOutlineBlank />
              <MdOutlineArchive />
            </div>
          </>
        )}
      </form>
      <Container>
        <Row>
          <div className="col d-flex notes">
            {notes.map((note, index) => (
              <div className="notes-list col-4 m-2" key={index}>
                <div className="note-item p-2">
                  <div className="note-header d-flex justify-content-between align-items-center">
                    <h3>{note.title}</h3>
                    <LuPin className='pin-icon ' />
                  </div>
                  <p>{note.description}</p>
                  {note.imageURL && <img src={note.imageURL} alt="Note" />}
                  <div className="note-footer d-flex justify-content-between align-items-center">
                    <div className="note-icons">
                      <button className='border-0 bg-light' onClick={() => handleEdit(note.id)}>
                        <MdOutlineEdit className="note-icons" />
                      </button>
                      <MdColorLens className="note-icons" />
                      <MdCheckBoxOutlineBlank className="note-icons" />
                      <MdOutlineArchive className="note-icons" />
                      <button className='border-0 bg-light' onClick={() => handleDelete(note.id)}>
                        <MdDeleteOutline className="note-icons" />
                      </button>
                    </div>
                    <MdMoreVert className="more-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default NoteApp;
