import React from 'react';

import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';


export const BASE_URL = 'http://api.pedigreeall.com/';
export function useAuth() {
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
    
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
        dispatch(createAction('SET_LOADING', false));
    });
  }, []);
  return {state};
}