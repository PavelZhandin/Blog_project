import { JSX } from "react";
import clsx from 'clsx';
import styles from './index.module.scss';
import DeleteIcon from '@mui/icons-material/Clear';
import { PostSkeleton } from "./PostSkeleton";
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { IconButton } from "@mui/material";
import { IUser } from "../../Models/IUser";
import { UserInfo } from '../UserInfo';
import { Link } from "react-router";

interface IProps {
    _id: number;
    title: string;
    createdAt: any;
    imageUrl: string;
    user: IUser;
    viewsCount: any;
    commentsCount: any;
    tags: string[];
    children: any;
    isFullPost: any;
    isLoading: any;
    isEditable: any;
}


export function Post ({
 _id,
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
                    <Link to={`/posts/${_id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}

            {imageUrl && (
                <img
                    className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                    src={imageUrl}
                    alt={title}
                />
            )}

            <div className={styles.wrapper}>
                {user && <UserInfo {...user} additionalText={createdAt} />}
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags?.map((name) => (
                        <li key={name}>
                            <Link to={`/tag/${name}`}>#{name}</Link>
                        </li>
                        ))}
                    </ul>
                    {children && <div className={styles.content}>{children}</div>}
                        <ul className={styles.postDetails}>
                            <li>
                                <EyeIcon />
                                <span>{viewsCount}</span>
                            </li>
                            <li>
                                <CommentIcon />
                                <span>{commentsCount}</span>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    );
}
