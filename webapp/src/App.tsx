import React from 'react';
import { Alert } from 'antd';

import { isKeyDefinitelyInvalid, updateInstructions } from './api-key';
import './App.css';
import Main from './Main';
import Form from './Form';

interface IProps {}

const App: React.SFC<IProps> = () => {
  return (
    <Main>
      {isKeyDefinitelyInvalid && (
        <Alert type="error" message="API Key Error" description={updateInstructions} />
      )}
      <section>
        <Form />
      </section>
    </Main>
  );
};

App.displayName = 'App';

export default App;
