import React from 'react';

import styled from 'styled-components';

import { dumpEverything, downloadFile } from '../utils/exporter'

const HeaderWrapper = styled.div`
background-color: #37474F;

width: 100%;
height: 4em;

flex-grow: 0;

vertical-align: middle;
display: flex;
justify-content: space-between;

font-family: 'Roboto', sans-serif;
color: white;

border-bottom: 2px solid #333;
`

const DumpButton = styled.div`
	height: 100%;
	
	font-size: 2em;

	text-align: center;

	cursor: pointer;

	:hover {
		background-color: #263238;
	}
`

function Header() {
	const dump = async () => {
		const everything = await dumpEverything()

		downloadFile("dump.log", everything)

		console.log(everything)
	}
	return (<HeaderWrapper>
				<h1>ExpressJS debug toolbar</h1>
				<DumpButton onClick={dump}>Dump everything</DumpButton>
			</HeaderWrapper>);
}

export default Header