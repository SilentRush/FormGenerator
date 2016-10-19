import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getFormsSuccess, getFormSuccess } from '../actions/form-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper'

 const API_ROOT = 'http://api.twilkislinux.sssworld-local.com/';

export function getForm(formid) {
  let FormStore = store.getState().formState;
  let form = FormStore.forms.filter((form)=>{
      return form.id == formid
  });
  store.dispatch(getFormSuccess(form[0]));
}

export function getForms() {
  let FormStore = store.getState().formState;
  return FormStore.forms;
}
