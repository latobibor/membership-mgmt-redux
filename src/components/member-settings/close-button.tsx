import React, { useContext } from 'react';
import { Store, StoreContext } from '../../store/store';
import { Actions } from '../../store/reducers';

interface CloseButtonProps {
  index: number;
}

export function CloseButton({ index }: CloseButtonProps) {
  const { dispatch } = useContext<StoreContext>(Store);

  const closeEditor = (payload: number) => dispatch({ type: Actions.RemoveMemberFromEditMode, payload });

  return (
    <button type="button" className="close text-info" aria-label="Close" onClick={() => closeEditor(index)}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
