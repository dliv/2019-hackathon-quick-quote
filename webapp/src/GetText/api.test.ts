import alDl from '../../../test-data/license/al.json';
import caDl from '../../../test-data/license/ca.json';
import waDl from '../../../test-data/license/wa.json';

import alPlate1 from '../../../test-data/plate/al-1.json';
import alPlate2 from '../../../test-data/plate/al-2.json';
import caPlate1 from '../../../test-data/plate/ca-1.json';
import caPlate2 from '../../../test-data/plate/ca-2.json';

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
    const word = await getWords('', 'drivers-license', fetch);
    expect(word).toBe('12345678');
  });

  test('CA', async () => {
    const fetch = fetchMocker(caDl);
    const word = await getWords('', 'drivers-license', fetch);
    expect(word).toBe('N2148870');
  });

  test('WA', async () => {
    const fetch = fetchMocker(waDl);
    const word = await getWords('', 'drivers-license', fetch);
    expect(word).toBe('WDLABCD456DG');
  });
});

describe.skip('plate', () => {
  describe('AL', () => {
    test('1', async () => {
      const fetch = fetchMocker(alPlate1);
      const word = await getWords('', 'plate', fetch);
      expect(word).toBe('0000000');
    });

    test('2', async () => {
      const fetch = fetchMocker(alPlate2);
      const word = await getWords('', 'plate', fetch);
      expect(word).toBe('UBIQTUS');
    });
  });

  describe('AL', () => {
    test('1', async () => {
      const fetch = fetchMocker(caPlate1);
      const word = await getWords('', 'plate', fetch);
      expect(word).toBe('6TRJ244');
    });

    test('2', async () => {
      const fetch = fetchMocker(caPlate2);
      const word = await getWords('', 'plate', fetch);
      expect(word).toBe('7ATJ554');
    });
  });
});
