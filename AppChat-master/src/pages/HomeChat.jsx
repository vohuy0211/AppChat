import React from 'react'
import ListUser from '../Component/ListUser/ListUser'

const HomeChatUser = ({ children }) => {
    return (
        <div>
            <ListUser />
            {children}
        </div>
    )
}

export default HomeChatUser;
