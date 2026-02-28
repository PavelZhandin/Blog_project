import { JSX } from "react";
import clsx from 'clsx';
import styles from './index.module.scss';
import DeleteIcon from '@mui/icons-material/Clear';
import { PostSkeleton } from "./PostSkeleton";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { IUser } from "../../Models/IUser";

interface IProps {
    id: number;
    title: string;
    createdAt: any;
    imageUrl: string;
    user: IUser;
    viewsCount: any;
    commentsCount: any;
    tags: any;
    children: any;
    isFullPost: any;
    isLoading: any;
    isEditable: any;
}


export function Post ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}: Partial<IProps>): JSX.Element {
    
    
    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = () => {};

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <a href={`/posts/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </a>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
}
