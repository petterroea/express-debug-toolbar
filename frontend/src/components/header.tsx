import React from 'react';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
background-color: #37474F;

width: 100%;
margin: 0px;
padding-left: 1em;
height: 4em;

flex-grow: 0;

vertical-align: middle;
display: table-cell;

font-family: 'Roboto', sans-serif;
color: white;

border-bottom: 2px solid #333;
`

function Header() {
	return (<HeaderWrapper>
				<h1>ExpressJS debug toolbar</h1>
			</HeaderWrapper>);
}

export default Header