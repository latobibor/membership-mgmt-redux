import React, { useState, useContext } from 'react';
import { EditorRow } from '../access-manager-layout/editor-row';
import { SelectAccessLevel } from './select-access-level';
import { Role, AccessLevel } from '../../clients/save-access-list';
import { SelectRole } from './select-role';
import { SelectMember } from './select-member';
import { CloseButton } from './close-button';
import { StoreContext, Store, MemberInEditMode } from '../../store/store';
import { Actions } from '../../store/reducers';

interface MemberSettingsProps {
  index: number;
}

export function MemberSettingsEditor({ index }: MemberSettingsProps) {
  const [selectedRole, selectRole] = useState<Role | undefined>();
  const [selectedPersonId, selectPersonId] = useState<string | undefined>();
  const [selectedAccessLevel, selectAccessLevel] = useState<AccessLevel | undefined>();

  const { dispatch } = useContext<StoreContext>(Store);

  function onMemberChange({ value }: any) {
    const person_id = value as string;
    selectPersonId(person_id);

    notifyAboutChanges({ index, person_id, role: selectedRole, access_level: selectedAccessLevel });
  }

  function onRoleChange({ value }: any) {
    const role = value as Role;
    selectRole(role);

    // because role change override access levels I unset the value here to be on the safe side
    selectAccessLevel(undefined);

    notifyAboutChanges({ index, person_id: selectedPersonId, role, access_level: undefined });
  }

  function onAccessLevelChange({ value }: any) {
    const access_level = value as AccessLevel;
    selectAccessLevel(access_level);

    notifyAboutChanges({ index, person_id: selectedPersonId, role: selectedRole, access_level });
  }

  function notifyAboutChanges(payload: MemberInEditMode) {
    dispatch({ type: Actions.ThereIsChangeToBeSaved, payload });
  }

  // TODO: get members from the store and remove members selected by others
  // needed: (membersInEditMode => person_ids + allMembers)

  return (
    <EditorRow>
      <div className="col-sm p-4">
        <SelectMember onChange={onMemberChange} selectedPersonId={selectedPersonId} />
      </div>
      <div className="col-sm p-4">
        <SelectRole onChange={onRoleChange} />
      </div>
      <div className="col-sm p-4">
        <SelectAccessLevel roleOfCurrentUser={selectedRole} onChange={onAccessLevelChange} />
      </div>
      <div className="col-sm-3 p-4 text-right">
        <CloseButton index={index} />
      </div>
    </EditorRow>
  );
}
