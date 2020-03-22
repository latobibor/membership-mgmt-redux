import { Member } from './mock-data';
import { fetch } from './mock-fetch';

export async function getMembersList(): Promise<Member[]> {
  const getMembersEndpoint = 'https://wqp-backend.api/access-manager/members';

  const response = await fetch(getMembersEndpoint);

  if (!response.ok) {
    throw new Error(
      `A ${response.status} error occurred during a call to ${getMembersEndpoint}: ${response.statusText}`,
    );
  }

  return response.json();
}
