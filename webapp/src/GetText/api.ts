import last from 'lodash/last';

import { Word } from './types';

const minLicenseLength = 8;
const maxLicenseLength = 12;

const endpoint = 'https://fp136ljut3.execute-api.us-east-1.amazonaws.com/prod/textract';

const wordMightBeLicense = (text: string) =>
  text.length >= minLicenseLength &&
  text.length <= maxLicenseLength &&
  /\d{1,}/.test(text) &&
  !text.includes('/') &&
  !text.includes('-');

const cleanPotentialLicenses = (m: Word): Word => ({
  ...m,
  Text: last(m.Text.split('#')) || '',
});

export const getWords = async (
  imgData: string,
  imgType: 'license' | 'plate' = 'license',
  fetch: Window['fetch'] = window.fetch,
): Promise<string | null> => {
  const resp = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ img: imgData }, null, 2),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error(resp.statusText || resp.status.toString());
  }
  const json = await resp.json();
  try {
    return json.extracted.Blocks.filter((b: any) => b.BlockType === 'WORD')
      .map(cleanPotentialLicenses)
      .filter((b: any) => wordMightBeLicense(b.Text))[0].Text;
  } catch (e) {
    return null;
  }
};
