import React from 'react';

import './App.css';

import Main from './Main';
import GetText from './GetText';

interface IProps {}

const App: React.SFC<IProps> = () => {
  return (
    <Main>
      <section>
        <GetText />
      </section>
    </Main>
  );
};

App.displayName = 'App';

export default App;
