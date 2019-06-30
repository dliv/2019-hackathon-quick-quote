import alDl from '../../../test-data/license/al-textract.json';
import caDl from '../../../test-data/license/ca-textract.json';
import waDl from '../../../test-data/license/wa-textract.json';

import alPlate1 from '../../../test-data/plate/al-1-rekog.json';
import alPlate2 from '../../../test-data/plate/al-2-rekog.json';
import caPlate1 from '../../../test-data/plate/ca-1-rekog.json';
import caPlate2 from '../../../test-data/plate/ca-2-rekog.json';

import { getWordsTextract, getWordsRekog } from './api';

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
    const word = await getWordsTextract('', 'drivers-license', fetch);
    expect(word).toBe('12345678');
  });

  test('CA', async () => {
    const fetch = fetchMocker(caDl);
    const word = await getWordsTextract('', 'drivers-license', fetch);
    expect(word).toBe('N2148870');
  });

  test('WA', async () => {
    const fetch = fetchMocker(waDl);
    const word = await getWordsTextract('', 'drivers-license', fetch);
    expect(word).toBe('WDLABCD456DG');
  });
});

describe('plate', () => {
  describe('AL', () => {
    test('0000000', async () => {
      const fetch = fetchMocker(alPlate1);
      const word = await getWordsRekog('', 'plate', fetch);
      expect(word).toBe('0000000');
    });

    test('UBIQTUS', async () => {
      const fetch = fetchMocker(alPlate2);
      const word = await getWordsRekog('', 'plate', fetch);
      expect(word).toBe('UBIQTUS');
    });
  });

  describe('CA', () => {
    test('6TRJ244', async () => {
      const fetch = fetchMocker(caPlate1);
      const word = await getWordsRekog('', 'plate', fetch);
      expect(word).toBe('6TRJ244');
    });

    test('7ATJ554', async () => {
      const fetch = fetchMocker(caPlate2);
      const word = await getWordsRekog('', 'plate', fetch);
      expect(word).toBe('7ATJ554');
    });
  });
});
