const initialState = {
  notes: [],
  singleNote: null,
  user:null
};

const KeepReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE_SUCCESS':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case 'GET_NOTES_SUCCESS':
      return {
        ...state,
        notes: action.payload
      };
    case 'SINGLE_NOTE_SUCCESS':
      return {
        ...state,
        singleNote: action.payload,
      };
    case 'UPDATE_NOTE_SUCCESS':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case 'DELETE_NOTE_SUCCESS':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

      case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default KeepReducer;
