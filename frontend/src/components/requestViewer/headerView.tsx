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

const HeaderTable = styled.table`
	padding: 1em;
`

const Row = styled.tr`

`

const Column = styled.td`
	padding: 0.3em;
`

type HeaderViewProps = {
	request: SerializedTransaction
}

function HeaderView(props: HeaderViewProps) {
	const reqHeaders = props.request.request.headers
	const respHeaders = props.request.response.headers
	return (<Container>
				<ViewerTitle>Request headers</ViewerTitle>
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
				<ViewerTitle>Response headers</ViewerTitle>
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
