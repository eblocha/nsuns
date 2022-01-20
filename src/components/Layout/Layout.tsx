import React from 'react'
import MainView from './MainView'
import TopInfo from './TopInfo'

const Layout = () => {
  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      <div className="flex-shrink-0 overflow-hidden">
        <TopInfo />
      </div>
      <div className="flex-grow overflow-hidden">
        <MainView />
      </div>
    </div>
  )
}

export default Layout
