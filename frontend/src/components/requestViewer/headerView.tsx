import React, { useState } from 'react';

import styled from 'styled-components';

import { Tabs, Tab } from '../tabs'



const Container = styled.div`
padding: 1em;
font-family: 'Roboto', sans-serif;
color: white;
`

const HeaderTable = styled.table`
	padding: 1em;
`

const Row = styled.tr`

`

const Column = styled.td`
	padding: 0.3em;
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
	metadata: any
}

type HeaderViewProps = {
	request: SerializedTransaction
}

function HeaderView(props: HeaderViewProps) {
	const reqHeaders = props.request.request.headers
	const respHeaders = props.request.response.headers
	return (<Container>
				<h1>Request headers</h1>
					<HeaderTable>
						<tbody>
							{
								Object.keys(reqHeaders).map(key => {
									return (<Row key={key}>
										<Column>{key}</Column>
										<Column>{reqHeaders[key]}</Column>
									</Row>)
								})
							}
						</tbody>
					</HeaderTable>
				<h1>Response headers</h1>
				<HeaderTable>
					<tbody>
						{
							Object.keys(respHeaders).map(key => {
								return (<Row key={key}>
									<Column>{key}</Column>
									<Column>{respHeaders[key]}</Column>
								</Row>)
							})
						}
					</tbody>
				</HeaderTable>
			</Container>);
}
export default HeaderView
