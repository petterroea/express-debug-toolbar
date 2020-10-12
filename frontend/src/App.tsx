import React from 'react';

import Header from './components/header'
import Body from './components/body'

import styled from 'styled-components';

const AppWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
overflow: auto;


background-color: #37474F;
margin: 0px;

display:flex;
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
