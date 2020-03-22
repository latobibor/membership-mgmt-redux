import { members } from './mock-data';

type FetchMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

interface MockFetchOptions {
  body: object;
  method: FetchMethod;
}

interface MockResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  json(): Promise<any>;
}

class MockResponseClass implements MockResponse {
  constructor(public readonly ok: boolean, public readonly status: number, public readonly statusText: string) {}

  json(): Promise<any> {
    return Promise.resolve(members);
  }
}

export function fetch(url: string, options?: MockFetchOptions): Promise<MockResponse> {
  const infoAboutOptions = options ? ` with ${JSON.stringify(options)}` : '';

  console.log(`API endpoint ${url} was called${infoAboutOptions}`);

  return Promise.resolve(new MockResponseClass(true, 200, 'Everything was fine'));
}
