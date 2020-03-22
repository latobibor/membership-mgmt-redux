import React, { useContext } from 'react';
import { MemberSettingsEditor } from '../member-settings/member-settings-editor';
import { Store, StoreContext } from '../../store/store';

export function AccessManagerBody() {
  const { state } = useContext<StoreContext>(Store);

  const { membersInEditMode } = state;

  return (
    <>
      {membersInEditMode.map(({ index }) => (
        <MemberSettingsEditor key={`${index}`} index={index} />
      ))}
    </>
  );
}
