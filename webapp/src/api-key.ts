export const apiKey = process.env.REACT_APP_API_KEY || null;

export const isKeyDefinitelyInvalid =
  !apiKey || apiKey === 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

export const updateInstructions =
  'Update REACT_APP_API_KEY in .env file or set as an environment variable.';

export default apiKey;
