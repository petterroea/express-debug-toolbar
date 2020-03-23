import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

const SidebarWrapper = styled.div`
width: 30em;
background-color: #37474F;
margin: 0px;

font-family: 'Roboto', sans-serif;
color: white;

border-right: 1px solid #333;
`

const EntryContainer = styled.div`
	padding: 1em;

	border-bottom: 1px solid #333;
	
	cursor: pointer;

	>p {
		font-size: 1.3em;
	}

	:hover {
		background-color: #263238;
	}
`

const StatusCodeWrapper = styled.div`
	border-radius: 5px;
	width: 4em;
	display: table-cell;
	text-align: center;
	vertical-align: middle;

	background-color: gray;

	> p {
		margin: 0px;
	}
`

type TransactionSummary = {
  uuid: string,
  url: string,
  method: string,
  code: number,

  start: Date,
  end: Date,
}

type StatusCodeProps = {
	code: number
}

type SidebarProps = {
	setUuid: (uuid: string) => void
}

function StatusCodeIndicator(props: StatusCodeProps) {
	let color = "#4CAF50"

	if(props.code >= 300 && props.code < 400) {
		color = "#673AB7"
	}
	else if(props.code >= 400 && props.code < 500) {
		color = "#F44336"
	}
	else if(props.code >= 500 && props.code < 600) {
		color = "#212121"
	}


	return (<StatusCodeWrapper style={{backgroundColor: color}}>
		<p>{props.code}</p>
	</StatusCodeWrapper>)
}

function CreateRequestEntry(summary: TransactionSummary, setUuid: (uuid: string) => void) {
	return (<EntryContainer key={summary.uuid} onClick={() => { setUuid(summary.uuid); }}>
		<h3>{summary.url}</h3>
		<StatusCodeIndicator code={summary.code} /><StatusCodeWrapper>{summary.method}</StatusCodeWrapper>
	</EntryContainer>)
}

function Sidebar(props: SidebarProps) {
	const [requests, setRequests] = useState([])

	useEffect( () => { 
		async function fetcher() {
			const response = await fetch(`/_debug/api/`)
			setRequests(await response.json())
		}
		fetcher()
	}, [])

	return (<SidebarWrapper>
				{ 
					requests.map(request => { 
						return CreateRequestEntry(request, props.setUuid) 
					}) 
				}
			</SidebarWrapper>);
}

export default Sidebar