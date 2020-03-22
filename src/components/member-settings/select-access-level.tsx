import React from 'react';
import Select from 'react-select';
import { AccessLevel, Role } from '../../clients/save-access-list';

interface AccessLevelSelectOption {
  value: AccessLevel;
  label: string;
}

const adminAccessLevelOption = { value: AccessLevel.Admin, label: 'Admin' };

const options: AccessLevelSelectOption[] = [
  adminAccessLevelOption,
  { value: AccessLevel.Write, label: 'Write' },
  { value: AccessLevel.Read, label: 'Read' },
];

interface SelectAccessLevelProps {
  roleOfCurrentUser?: Role;
  onChange: (selectedOption: any) => void;
}

function filterAccessLevelsBy(role?: Role) {
  switch (role) {
    case Role.Manager:
      return options.filter(option => option.value === AccessLevel.Admin);
    case Role.Employee:
      return options.filter(option => option.value === AccessLevel.Write || option.value === AccessLevel.Admin);
    case Role.Customer:
      return options.filter(option => option.value === AccessLevel.Write || option.value === AccessLevel.Read);
    default:
      return [];
  }
}

export function SelectAccessLevel({ roleOfCurrentUser, onChange }: SelectAccessLevelProps) {
  const filteredOptions = filterAccessLevelsBy(roleOfCurrentUser);

  return <Select options={filteredOptions} onChange={onChange} />;
}
