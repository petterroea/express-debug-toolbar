import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'

import SerializedTransaction from './serializedTransaction'

const Container = styled.div`
padding: 1em;
font-family: 'Roboto', sans-serif;
color: white;
`

const HeaderTable = styled.table`
	margin: 1em;
	width: 100%;
	border: 1px solid #111;
`

const Row = styled.tr`

`

const Column = styled.td`
	padding: 0.3em;
	border: 1px solid #111;
`

const Code = styled.code`
	background-color: #263238;
	width: 100%;
	display: block;
`

type VariableViewProps = {
	request: SerializedTransaction
}

function VariableView(props: VariableViewProps) {
	const getParameters = props.request.request.query
	const postParameters = props.request.request.body
	return (<Container>
				<h1>GET parameters</h1>
					<HeaderTable>
						<tbody>
							{
								Object.keys(getParameters).map(key => {
									return (<Row key={key}>
										<Column>{key}</Column>
										<Column>{getParameters[key]}</Column>
									</Row>)
								})
							}
						</tbody>
					</HeaderTable>
					<p><i>{Object.keys(getParameters).length} {Object.keys(getParameters).length==1?"Entry":"Entries"}</i></p>
				{
					typeof props.request.request.body !== "undefined"
					? (
						<div>
							<h1>POST body</h1>
							<Code>{postParameters}</Code>
						</div>
					)
					: null
				}
			</Container>);
}
export default VariableView
