import React from 'react';
import { Alert } from 'antd';

import { getWords } from './api';
import { getData } from './data-uri-utils';
import { Wrapper } from './styles';
import { DocType } from './types';

interface IProps {
  docType: DocType;
  onSubmit: (text: string | null) => void;
}

const GetText: React.SFC<IProps> = ({ docType, onSubmit }) => {
  const [dataUri, setDataUri] = React.useState<string | null>(null);
  const [word, setWord] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  return (
    <Wrapper>
      {error && <Alert type="error" message="Error" description={error.message} />}
      <input
        type="file"
        disabled={isFetching}
        accept=".jpg,.jpeg,.png"
        onChange={function({ target: { files } }) {
          setDataUri(null);
          setWord(null);
          setError(null);
          setIsFetching(false);

          const file = files && files[0];
          if (!file) {
            return;
          }
          const FR = new FileReader();
          FR.addEventListener('load', async (e: any) => {
            const newDataUri = e.target.result;
            setDataUri(newDataUri);
            try {
              setIsFetching(true);
              const data = getData(newDataUri);
              if (!data) {
                throw new Error('no data in uri');
              }
              const wordFromApi = await getWords(data, docType);
              setWord(wordFromApi);
              setIsFetching(false);
              onSubmit(wordFromApi);
            } catch (e) {
              console.error(e);
              setError(e);
              setIsFetching(false);
            }
          });
          FR.readAsDataURL(file);
        }}
      />
      {dataUri && (
        <div>
          <img src={dataUri} height={150} />
          {word && (
            <div>
              <strong>{word}</strong>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

GetText.displayName = 'GetText';

export default GetText;
