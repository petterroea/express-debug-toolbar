import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'



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

type SerializedTransaction = {
	request: {
		fresh: boolean,
		host: string,
		ip: string,
		ips: Array<string>,
		method: string,
		originalUrl: string,
		params: Array<string>,
		query: { [index: string]: string},
		headers: { [index: string]: string}
	},
	response: {
		code: number,
		headers: { [index: string]: string}
	},
	body: any,
	metadata: any,
	start: string,
	end: string
}

type BodyViewProps = {
	request: SerializedTransaction
}

function BodyView(props: BodyViewProps) {
	const startDate = new Date(props.request.start)
	const endDate = new Date(props.request.end)
	return (<Container>
				<h1>Response body</h1>
				<Code>
				{
					(typeof props.request.body === "string")
					? props.request.body
					: (
						(typeof props.request.body === "object")
						? JSON.stringify(props.request.body)
						: (<i>Unknown body type</i>)
					) 
				}
				</Code>
			</Container>);
}
export default BodyView
