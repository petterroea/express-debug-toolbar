import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import HeaderView from './headerView'
import SummaryView from './summaryView'
import ResponseView from './responseView'
import VariableView from './variableView'

import SerializedTransaction from './serializedTransaction'

const BodyWrapper = styled.div`

font-family: 'Roboto', sans-serif;
color: white;
`

const BodyFlexContainer = styled.div`
	display: flex;
	flex-grow: 1;
`

type RequestProps = {
	request: SerializedTransaction
}

function RequestViewer(props: RequestProps) {
	return (<BodyFlexContainer>
				<Tabs defaultTab={"Summary"}>
				    <Tab title="Summary"><SummaryView request={props.request}/></Tab>
				    <Tab title="Headers"><HeaderView request={props.request}/></Tab>
				    <Tab title="Variables"><VariableView request={props.request}/></Tab>
				    { 
				    	typeof props.request.response.body !== "undefined" 
				    	? (<Tab title="Response"><ResponseView request={props.request}/></Tab>) 
				    	: null 
				    }
				</Tabs>
			</BodyFlexContainer>);
}
export default RequestViewer
