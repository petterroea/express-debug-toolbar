import React from 'react';

import Header from './components/header'
import Body from './components/body'

import styled from 'styled-components';

const AppWrapper = styled.div`
width: 100%;
background-color: #37474F;
margin: 0px;
display: flex;
flex-direction: column;
`

function App() {
  return (
    <AppWrapper className="App">
      <Header />
      <Body />
    </AppWrapper>
  );
}

export default App;
