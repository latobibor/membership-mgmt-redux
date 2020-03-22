import { fetch } from './mock-fetch';

interface MemberAccessChangePayload {
  members: AccessChange[];
}

export interface AccessChange {
  person_id: string;
  role: Role;
  access_level: AccessLevel;
}

export enum Role {
  Customer = 'customer',
  Manager = 'manager',
  Employee = 'employee',
}

export enum AccessLevel {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export async function saveAccessChanges(changes: AccessChange[]): Promise<void> {
  const saveEndpoint = 'https://wqp-backend.api/access-manager/members/access-levels';

  const body: MemberAccessChangePayload = {
    members: changes,
  };

  const response = await fetch(saveEndpoint, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error(`A ${response.status} error occurred during a call to ${saveEndpoint}: ${response.statusText}`);
  }
}
