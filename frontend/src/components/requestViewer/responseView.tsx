import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import SerializedTransaction from './serializedTransaction'

const Container = styled.div`
padding: 1em;
font-family: 'Roboto', sans-serif;
color: white;
`

const Code = styled.code`
	background-color: #263238;
	width: 100%;
	display: block;
`

type ResponseViewProps = {
	request: SerializedTransaction
}

function ResponseView(props: ResponseViewProps) {
	const startDate = new Date(props.request.start)
	const endDate = new Date(props.request.end)
	return (<Container>
				<h1>Response body</h1>
				<Code>
				{
					(typeof props.request.response.body === "string")
					? props.request.response.body
					: (
						(typeof props.request.response.body === "object")
						? JSON.stringify(props.request.response.body)
						: (<i>Unknown body type</i>)
					) 
				}
				</Code>
			</Container>);
}
export default ResponseView
