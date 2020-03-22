import { Actions } from './reducers';
import { AccessChange } from '../clients/save-access-list';
import { Member } from '../clients/mock-data';
import { createStore, Reducer } from 'redux';

export interface MemberInEditMode extends Partial<AccessChange> {
  index: number;
}

export interface GlobalState {
  allMembers: Member[];
  membersInEditMode: MemberInEditMode[];
  changesToBeSaved: boolean;
}

export interface Action {
  type: Actions;
  payload: Partial<GlobalState>;
}

export const initialState: GlobalState = {
  allMembers: [],
  membersInEditMode: [],
  changesToBeSaved: false,
};

export const store = createStore<GlobalState, Action, null, null>(rootReducer);
