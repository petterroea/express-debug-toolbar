import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

const SidebarWrapper = styled.div`
min-width: 30em;
width: 30em;
background-color: #37474F;
margin: 0px;

height: 5em;

overflow-y: scroll;

font-family: 'Roboto', sans-serif;
color: white;

border-right: 1px solid #333;

flex-grow: 1;

`

const SidebarOuter = styled.div`
	height: 100%;
	display: flex; /*added*/
  flex-direction: column; /*added*/
  align-items: stretch;
`

interface EntryContainerProps {
	selected: boolean
}

const EntryContainer = styled.div`
	padding: 0.5em 0em 0.5em 0em;
	border-bottom: 1px solid #333;
	position: relative;
	
	width: 100%;

	cursor: pointer;

	>p {
		font-size: 1.3em;
	}

	${(p: EntryContainerProps) => {
		return p.selected ? `background-color: #263238;` : ""
	}}

	:hover {
		background-color: #263238;
	}
`

const EntryLine = styled.code`
	line-height: 1.5em;
	display: block;
	margin: 0em;
`

const StatusCodeWrapper = styled.div`
	border-radius: 5px;
	width: 4em;
	text-align: center;

	background-color: gray;
	position: absolute;
	display: inline;
	right: 1em;

	> p {
		margin: 0px;
	}
`

type TransactionSummary = {
  didComplete: boolean,
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
	setUuid: (uuid: string) => void,
	selectedUuid: string
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

function CreateRequestEntry(summary: TransactionSummary, setUuid: (uuid: string) => void, isSelected: boolean) {
	return (<EntryContainer key={summary.uuid} onClick={() => { setUuid(summary.uuid); }} selected={isSelected}>
		{
			summary.didComplete 
			? (<StatusCodeIndicator code={summary.code} />) 
			: (<StatusCodeWrapper>Internal error</StatusCodeWrapper>)
		}
		<EntryLine>{summary.method}</EntryLine>
		<EntryLine>{summary.url}</EntryLine>
	</EntryContainer>)
}

function Sidebar(props: SidebarProps) {
	const [requests, setRequests] = useState([] as any[])

	useEffect( () => { 
		async function fetcher() {
			const response = await fetch(`/_debug/api/`)
			setRequests(await response.json())
		}
		fetcher()

		const interval = setInterval(fetcher, 500);

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (<SidebarOuter><SidebarWrapper>
				{ 
					requests.map((request: any) => { 
						return CreateRequestEntry(request, props.setUuid, props.selectedUuid === request.uuid) 
					}) 
				}
			</SidebarWrapper></SidebarOuter>);
}

export default Sidebar