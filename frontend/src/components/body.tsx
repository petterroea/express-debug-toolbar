import React, { useState } from 'react';

import styled from 'styled-components';
import Sidebar from './sidebar'
import RequestViewer from './requestViewer'


const BodyWrapper = styled.div`

font-family: 'Roboto', sans-serif;
color: white;
`

const BodyFlexContainer = styled.div`
	display: flex;
	flex-grow: 1;
`

function Body() {
	const [currentUuid, setCurrentUuid] = useState("")
	const [currentTransaction , setCurrentTransaction] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	function changeState(uuid: string) {
		setLoading(true)
		async function asyncChanger() {
			const resp = await fetch(`/_debug/api/${uuid}`)
			const blob = await resp.json()
			setCurrentUuid(uuid)
			setCurrentTransaction(blob)
			setLoading(false)
		}
		asyncChanger()
	}

	let placeholder = (<h1>Select a request to begin</h1>)

	return (<BodyFlexContainer>
				<Sidebar setUuid={changeState} selectedUuid={currentUuid}/>
				<BodyWrapper>
					{ loading ? 
						(<p>Loading...</p>) : 
						( currentTransaction !== null ? 
							<RequestViewer request={currentTransaction} /> : 
							placeholder 
						)  
					}
				</BodyWrapper>
			</BodyFlexContainer>);
}

export default Body