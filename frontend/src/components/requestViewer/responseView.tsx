import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import SerializedTransaction from './serializedTransaction'

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
`

type ResponseViewProps = {
	request: SerializedTransaction
}

function ResponseView(props: ResponseViewProps) {
	const startDate = new Date(props.request.start)
	const endDate = new Date(props.request.end)
	return (<Container>
				<ViewerTitle>Response body</ViewerTitle>
				<Code>
				{
					(typeof props.request.response.body === "string")
					? props.request.response.body
					: (
						(typeof props.request.response.body === "object")
						? (
							JSON.stringify(props.request.response.body, null, 4)
								.split("\n")
								.map((line: string) => {
									return (<p>{line}</p>)
								})
						)
						: (<i>Unknown body type</i>)
					) 
				}
				</Code>
			</Container>);
}
export default ResponseView
