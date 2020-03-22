import { GlobalState, Action, MemberInEditMode, initialState } from './store';
import { AccessLevel, Role } from '../clients/save-access-list';
import { Reducer } from 'react';

export enum Actions {
  AddMembersFromApi = 'ADD MEMBERS FROM API',
  AddMemberToEditMode = 'ADD MEMBER TO EDIT MODE',
  RemoveMemberFromEditMode = 'REMOVE MEMBER FROM EDIT MODE',
  ThereIsChangeToBeSaved = 'THERE IS CHANGE TO BE SAVED',
  ChangesAreSaved = 'CHANGES ARE SAVED',
}

export const reducers = {
  [Actions.AddMembersFromApi]: (state: GlobalState, { payload }: Action): GlobalState => ({
    ...state,
    allMembers: [...payload],
  }),
  [Actions.AddMemberToEditMode]: (state: GlobalState, { payload }: Action): GlobalState => ({
    ...state,
    membersInEditMode: [...state.membersInEditMode, { index: payload }],
  }),
  [Actions.RemoveMemberFromEditMode]: (state: GlobalState, { payload: indexToBeRemoved }: Action): GlobalState => ({
    ...state,
    membersInEditMode: [...state.membersInEditMode.filter(({ index }) => index !== indexToBeRemoved)],
  }),
  [Actions.ThereIsChangeToBeSaved]: (
    state: GlobalState,
    { payload: { index, person_id, access_level, role } }: Action,
  ): GlobalState => ({
    ...state,
    changesToBeSaved: Boolean(person_id && access_level && role),
    membersInEditMode: updateMemberAndReturnAllItems(state.membersInEditMode, index, person_id, access_level, role),
  }),
  [Actions.ChangesAreSaved]: (state: GlobalState): GlobalState => ({
    ...state,
    changesToBeSaved: false,
  }),
};

function updateMemberAndReturnAllItems(
  membersInEditMode: MemberInEditMode[],
  index: number,
  person_id: string,
  access_level: AccessLevel,
  role: Role,
) {
  const copyOfArray = [...membersInEditMode];

  const indexToBeUpdated = copyOfArray.findIndex(member => member.index === index);

  copyOfArray[indexToBeUpdated] = {
    index,
    person_id,
    access_level,
    role,
  };

  return copyOfArray;
}

export const rootReducer: Reducer<GlobalState, Action> = (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};
