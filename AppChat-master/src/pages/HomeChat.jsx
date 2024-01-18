import React from 'react'
import ListUser from '../Component/ListUser/ListUser'
import styles from "./HomeChat.module.css"

const HomeChatUser = ({ children }) => {
    return (
        <div className={styles.wrapperContent}>
            <ListUser />
            {children}
        </div>
    )
}

export default HomeChatUser;
