import { EDIT_POST, DELETE_POST, FETCH_POST } from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
    //case ADD_POST:
    //  return [...state, action.payload];
    case EDIT_POST:
      return state.map((item) => item.id !== action.payload.id ? item : Object.assign({}, item, { title: action.payload.title, searchkeys: action.payload.searchkeys, body: action.payload.body, price: action.payload.price, image: action.payload.image }));
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload.id);
    case FETCH_POST:
      return action.posts;
    default:
      return state;
  }
}
