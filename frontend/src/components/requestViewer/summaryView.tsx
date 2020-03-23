import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'



const Container = styled.div`
padding: 1em;
font-family: 'Roboto', sans-serif;
color: white;
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

type SummaryViewProps = {
	request: SerializedTransaction
}

function SummaryView(props: SummaryViewProps) {
	const startDate = new Date(props.request.start)
	const endDate = new Date(props.request.end)
	return (<Container>
				<h1>Request summary</h1>
				<p><b>{props.request.request.method}</b> {props.request.request.originalUrl}</p>
				<p>Requested at {startDate.toLocaleString()} handled in {endDate.getTime()-startDate.getTime()}ms</p>
				<p>Body type: {typeof props.request.body}</p>
			</Container>);
}
export default SummaryView
