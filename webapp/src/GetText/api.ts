import last from 'lodash/last';

import { Word, DocType } from './types';

const minDriversLicenseLength = 8;
const maxDriversLicenseLength = 12;

const minPlateLength = 4;
const maxPlateLength = 7;

const endpoint = 'https://fp136ljut3.execute-api.us-east-1.amazonaws.com/prod/textract';

const wordMightBeDriversLicense = (text: string) =>
  text.length >= minDriversLicenseLength &&
  text.length <= maxDriversLicenseLength &&
  /\d{1,}/.test(text) &&
  !text.includes('/') &&
  !text.includes('-');

const cleanPotentialDriversLicenses = (m: Word): Word => ({
  ...m,
  Text: last(m.Text.split('#')) || '',
});

const wordMightPlate = (text: string) =>
  text.length >= minPlateLength && text.length <= maxPlateLength;

export const getWords = async (
  imgData: string,
  docType: DocType,
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
      .map((b: any) => (docType === 'drivers-license' ? cleanPotentialDriversLicenses(b) : b))
      .filter((b: any) =>
        (docType === 'drivers-license' ? wordMightBeDriversLicense : wordMightPlate)(b.Text),
      )[0].Text;
  } catch (e) {
    return null;
  }
};
