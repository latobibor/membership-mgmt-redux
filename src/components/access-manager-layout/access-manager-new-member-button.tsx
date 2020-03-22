import React, { useContext, useMemo } from 'react';
import { EditorRow } from './editor-row';
import { Store, StoreContext } from '../../store/store';
import { Actions } from '../../store/reducers';

// TODO: if I had more time I could have come up with something smarter
let itemCounter = 0;

export function AccessManagerNewMemberButton() {
  const { dispatch } = useContext<StoreContext>(Store);

  return useMemo(() => {
    const addOneMoreMemberSelector = (payload: any) => dispatch({ type: Actions.AddMemberToEditMode, payload });

    return (
      <EditorRow>
        <div className="col p-4">
          <button type="button" className="btn btn-link" onClick={() => addOneMoreMemberSelector(itemCounter++)}>
            + Change access levels of a person
          </button>
        </div>
      </EditorRow>
    );
  }, [dispatch]);
}
