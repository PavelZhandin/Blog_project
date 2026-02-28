import { JSX } from "react";
import { SideBlock } from "../SideBlock";
import TagIcon from "@mui/icons-material/Tag";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material";

interface IProps {
    items: string[];
    isLoading?: boolean;
}

export function TagsBlock ({ items, isLoading = true }: IProps): JSX.Element {
    return (
        <SideBlock title="Тэги">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/tags/${name}`}
                >
                    <ListItem key={i} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon />
                            </ListItemIcon>
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                <ListItemText primary={name} />
                            )}
                        </ListItemButton>
                    </ListItem>
                </a>
                ))}
            </List>
        </SideBlock>
    );
}
