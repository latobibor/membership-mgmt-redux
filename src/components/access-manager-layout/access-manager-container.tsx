import React, { useContext, useEffect } from 'react';
import { AccessManagerHeader as Header } from './access-manager-header';
import { AccessManagerBody as Body } from './access-manager-body';
import { AccessManagerNewMemberButton as Footer } from './access-manager-new-member-button';
import { getMembersList } from '../../clients/get-members-list';
import { Member } from '../../clients/mock-data';
import { StoreContext, Store } from '../../store/store';
import { Actions } from '../../store/reducers';

export function AccessManagerContainer() {
  const { dispatch } = useContext<StoreContext>(Store);

  useEffect(() => {
    function addMembersFromApi(payload: Member[]): void {
      dispatch({ type: Actions.AddMembersFromApi, payload });
    }

    // note: async function introduced so error handling can be done via try-catch
    async function downloadMembersList() {
      try {
        const membersFromApi = await getMembersList();
        addMembersFromApi(membersFromApi);
      } catch (error) {
        // TODO: global error handling
        console.error(error);
      }
    }

    downloadMembersList();
  }, [dispatch]);

  return (
    <div className="m-sm-2 m-md-5">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
