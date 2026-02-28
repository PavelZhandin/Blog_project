import { Paper, Typography } from "@mui/material";
import styles from "./SideBlock.module.scss";
import { JSX, ReactNode } from "react";

interface IProps {
    title: string;
    children: ReactNode;
}

export function SideBlock ({ title, children }: IProps): JSX.Element {
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography variant="h6" classes={{ root: styles.title }}>
                {title}
            </Typography>
            {children}
        </Paper>
    )
}
