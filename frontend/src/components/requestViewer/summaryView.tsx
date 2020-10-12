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

type SummaryViewProps = {
	request: SerializedTransaction
}

function SummaryView(props: SummaryViewProps) {
	const startDate = new Date(props.request.start)
	const endDate = new Date(props.request.end)
	return (<Container>
				<ViewerTitle>Request summary</ViewerTitle>
				<p><b>{props.request.request.method}</b> {props.request.request.originalUrl}</p>
				<p>Requested at {startDate.toLocaleString()} handled in {endDate.getTime()-startDate.getTime()}ms</p>
				<p>Response type: {typeof props.request.response.body}</p>
			</Container>);
}
export default SummaryView
