import { combineReducers } from 'redux';
import uiStateReducer from './uiStateReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  uiState: uiStateReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});
