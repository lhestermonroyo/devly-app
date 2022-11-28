import {
  GET_CURRENT_PAGE,
  LOADING_FORM_START,
  LOADING_FORM_END,
  LOADING_PAGE_START,
  LOADING_PAGE_END,
} from '../constants/uiStateConstants';

export const loadingFormStart = () => ({ type: LOADING_FORM_START });

export const loadingFormEnd = () => ({ type: LOADING_FORM_END });

export const loadingPageStart = () => ({ type: LOADING_PAGE_START });

export const loadingPageEnd = () => ({ type: LOADING_PAGE_END });

export const getCurrentPage = currentPage => ({
  type: GET_CURRENT_PAGE,
  payload: currentPage,
});
