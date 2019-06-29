import alDl from '../../../test-data/license/al.json';
import caDl from '../../../test-data/license/ca.json';
import waDl from '../../../test-data/license/wa.json';

import { getWords } from './api';

const fetchMocker = (json: any): Window['fetch'] => {
  const mock = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(json),
    });
  return (mock as any) as Window['fetch'];
};

describe('license', () => {
  test('AL', async () => {
    const fetch = fetchMocker(alDl);
    const word = await getWords('', 'license', fetch);
    expect(word).toBe('12345678');
  });

  test('CA', async () => {
    const fetch = fetchMocker(caDl);
    const word = await getWords('', 'license', fetch);
    expect(word).toBe('N2148870');
  });

  test('WA', async () => {
    const fetch = fetchMocker(waDl);
    const word = await getWords('', 'license', fetch);
    expect(word).toBe('WDLABCD456DG');
  });
});
