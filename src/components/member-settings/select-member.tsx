import React, { useContext } from 'react';
import Select from 'react-select';
import { Member } from '../../clients/mock-data';
import { StoreContext, Store, MemberInEditMode } from '../../store/store';

interface SelectMemberProps {
  selectedPersonId?: string;
  onChange: (selectedOption: any) => void;
}

function transformMembersToSelectOptions(members: Member[]): { label: string; value: string }[] {
  return members.map(({ firstname, lastname, person_id }: Member) => ({
    label: `${firstname} ${lastname}`,
    value: person_id,
  }));
}

function filterAlreadySelectedMembers(
  members: Member[],
  membersInEditMode: MemberInEditMode[],
): Member[] {
  return members.filter(
    ({person_id: memberPersonId }) => membersInEditMode.findIndex(({person_id}) => person_id === memberPersonId) === -1,
  );
}

export function SelectMember({ onChange }: SelectMemberProps) {
  const {
    state: { allMembers, membersInEditMode },
  } = useContext<StoreContext>(Store);

  const filteredList = filterAlreadySelectedMembers(allMembers, membersInEditMode);
  const options = transformMembersToSelectOptions(filteredList);

  return <Select options={options} onChange={onChange} />;
}
