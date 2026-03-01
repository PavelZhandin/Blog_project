import React from 'react';

import { IUser } from '../../Models/IUser';

import styles from './UserInfo.module.scss';

interface IProps extends IUser {
    additionalText?: string;
}

export function UserInfo({ avatarUrl, fullName, additionalText }: IProps) {
    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
}
