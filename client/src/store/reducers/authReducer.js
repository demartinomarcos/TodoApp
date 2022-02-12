import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';


const initialState = {
  token: localStorage.getItem('token'),
  name: null,
  _id: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADED':
    case 'SIGN_IN':
    case 'SIGN_UP':
      toast('Welcome', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const user = jwtDecode(action.token);
      return {
        ...initialState,
        token: action.token,
        name: user.name,
        _id: user._id
      };
    case 'SIGN_OUT':
      toast('Good bye', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      localStorage.removeItem('token');
      return {
        ...initialState,
        token: null,
        name: null,
        _id: null
      }
    default:
      return state;
  }
};

export default authReducer;