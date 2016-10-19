import * as types from '../actions/action-types';

export function getFormsSuccess(forms) {
  return {
    type: types.GET_FORMS_SUCCESS,
    forms
  };
}

export function getFormSuccess(form) {
  return {
    type: types.GET_FORM_SUCCESS,
    form
  };
}
