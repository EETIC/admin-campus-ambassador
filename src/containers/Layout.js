import React from 'react'
import { Sidebar } from '../components';

const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        <div className='flex flex-row h-full'>
            {/* <SocialMedia /> */}
            <Sidebar />
            <div className="">
                <Component />
            </div>
            {/* <NavigationDots active={idName} /> */}
        </div>
    )
}

export default AppWrap