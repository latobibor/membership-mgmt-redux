import React from 'react';
import { EditorRow } from './editor-row';

export function AccessManagerHeader() {
  return (
    <EditorRow darkTheme>
      <div className="col-sm p-4">Member</div>
      <div className="col-sm p-4">Role</div>
      <div className="col-sm p-4">Access level</div>
      <div className="col-sm-3 p-4">&nbsp;</div>
    </EditorRow>
  );
}
