import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import HeaderView from './headerView'
import SummaryView from './summaryView'
import BodyView from './bodyView'


const BodyWrapper = styled.div`

font-family: 'Roboto', sans-serif;
color: white;
`

const BodyFlexContainer = styled.div`
	display: flex;
	flex-grow: 1;
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

type RequestProps = {
	request: SerializedTransaction
}

function RequestViewer(props: RequestProps) {
	return (<BodyFlexContainer>
				<Tabs defaultTab={"Summary"}>
				    <Tab title="Summary"><SummaryView request={props.request}/></Tab>
				    <Tab title="Headers"><HeaderView request={props.request}/></Tab>
				    { 
				    	typeof props.request.body !== "undefined" 
				    	? (<Tab title="Body"><BodyView request={props.request}/></Tab>) 
				    	: null 
				    }
				</Tabs>
			</BodyFlexContainer>);
}
export default RequestViewer
