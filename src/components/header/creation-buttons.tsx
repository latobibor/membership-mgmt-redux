import React, { useContext } from 'react';
import { saveAccessChanges, AccessChange } from '../../clients/save-access-list';
import { StoreContext, Store } from '../../store/store';
import { Actions } from '../../store/reducers';

function newButtonClick() {
  console.log('SEE Readme.md ABOUT CORNERS BEING CUT');
}

export function CreationButtons() {
  const { state, dispatch } = useContext<StoreContext>(Store);
  const { changesToBeSaved, membersInEditMode } = state;

  const changesAreSaved = () => dispatch({ type: Actions.ChangesAreSaved, payload: null });

  async function saveChanges() {
    const changes: Partial<AccessChange>[] = membersInEditMode.map(({ person_id, role, access_level }) => ({
      person_id,
      role,
      access_level,
    }));

    const validChanges = changes.filter(
      change => change.person_id && change.role && change.access_level,
    ) as AccessChange[];

    try {
      await saveAccessChanges(validChanges);
      changesAreSaved();
    } catch (error) {
      console.error(error);
      // TODO: dispatch and pop up some friendly error message
    }
  }

  return (
    <>
      <button type="button" className="px-4 btn btn-light border-secondary" onClick={newButtonClick}>
        New Member
      </button>

      {changesToBeSaved && (
        <button type="button" className="px-4 ml-4 btn btn-info" onClick={saveChanges}>
          Save Changes
        </button>
      )}
    </>
  );
}
