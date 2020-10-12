import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import SerializedTransaction from './serializedTransaction'

import { generateHttpDump } from '../../utils/exporter'

import { ViewerTitle } from './common'

const Container = styled.div`
padding: 1em;
font-family: 'Roboto', sans-serif;
color: white;
`

const Code = styled.code`
	background-color: #263238;
	width: 100%;
    display: block;
    white-space: pre-line;
`

type ResponseViewProps = {
	request: SerializedTransaction
}

function DumpView(props: ResponseViewProps) {
	const startDate = new Date(props.request.start)
    const endDate = new Date(props.request.end)
    console.log(generateHttpDump(props.request))
	return (<Container>
				<ViewerTitle>Response dump preview</ViewerTitle>
				<Code>
                    { generateHttpDump(props.request) }
				</Code>
			</Container>);
}
export default DumpView
