import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  cloneElement,
  isValidElement,
  FunctionComponent,
  ReactNode
} from 'react'

import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TabWrapper = styled.div`
  display: flex;
`

const TabButton = styled.div`
  min-width: 2em;
  font-size: 1.2em;
  padding: 1em;
  padding-right: 1.5em;

  cursor: pointer;

  :hover {
    background-color: rgba(0,0,0,0.2);
  }
`

const ChildContainer = styled.div`

`

type TabsProps = {
  children: Array<ReactNode>,
  defaultTab: string
}

export const Tabs: FunctionComponent<TabsProps> = ({children, defaultTab}: TabsProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab)
  return (
    <TabsContainer>
      <TabWrapper>
        { 
          children.map((child) => {
            const ch: any = child as any //Forgive me lord for i have sinned
            if(ch === undefined || ch === null) {
              return null;
            }
            return <TabButton style={ch.props.title==currentTab?{backgroundColor: "rgba(0,0,0,0.2)"}:{}}key={ch.props.title} onClick={() => {
              setCurrentTab(ch.props.title)
            }}>{ch.props.title}</TabButton>
          })
        }
      </TabWrapper>
      <ChildContainer>
        { 
          children.filter((child) => {
            const ch: any = child as any
            if(ch === undefined || ch === null) {
              return null;
            }
            return ch.props.title == currentTab
          }) 
        }
      </ChildContainer>
    </TabsContainer>
  )
}

type TabProps = {
  title: string
}

export const Tab: FunctionComponent<TabProps> = ({ title, children }) => {
  return (<div>{children}</div>)
}
