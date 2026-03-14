import {
    Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton
} from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";

import { IComment } from "../../Models/IUser";
import { SideBlock } from "../SideBlock";

interface IProps {
    items: IComment[] | undefined;
    children?: ReactNode;
    isLoading?: boolean;
}

export function CommentsBlock ({items, children, isLoading = true }: IProps): JSX.Element {
    return (
        <SideBlock title="">
            <List>
                {(isLoading ? [...Array(5)] : items || []).map((comment, index) => (
                    <Fragment key={ index }>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40} />
                                ) : <Avatar alt={comment?.user.fullName} src={comment?.user.avatarUrl} /> }
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{ display: 'flex', flexDirection: "column" }} />
                            ) : (
                                <ListItemText
                                    primary={comment?.user?.fullName}
                                    secondary={comment?.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
                ))}
            </List>
            {children}
        </SideBlock>
    );
}
