import {
  GET_CURRENT_PAGE,
  LOADING_FORM_START,
  LOADING_FORM_END,
  LOADING_PAGE_START,
  LOADING_PAGE_END,
} from '../constants/uiStateConstants';

const initialState = {
  loadingForm: false,
  loadingPage: false,
  currentPage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_FORM_START:
      return {
        ...state,
        loadingForm: true,
      };
    case LOADING_FORM_END:
      return {
        ...state,
        loadingForm: false,
      };
    case LOADING_PAGE_START:
      return {
        ...state,
        loadingPage: true,
      };
    case LOADING_PAGE_END:
      return {
        ...state,
        loadingPage: false,
      };
    case GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
