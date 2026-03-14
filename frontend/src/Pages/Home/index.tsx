import { Grid, Tab, Tabs } from "@mui/material";
import { JSX, useEffect } from "react";

import { CommentsBlock } from "../../Components/CommentsBlock";
import { Post } from "../../Components/Post";
import { TagsBlock } from "../../Components/TagsBlock";
import { COMMENT_ITEMS } from "../../mockData/CommentItems";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPosts, fetchTags, selectIsPostsLoading, selectIsTagListLoading, selectPosts, selectTagsList } from "../../redux/slices/posts";

export function Home (): JSX.Element {
    const dispatch = useAppDispatch();
    const postList = useAppSelector(selectPosts);
    const tags = useAppSelector(selectTagsList);
    const isPostsLoading = useAppSelector(selectIsPostsLoading);
    const isTagListLoading = useAppSelector(selectIsTagListLoading);

    console.log(postList);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0}>
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid size={8}>
                    {isPostsLoading ? [...Array(5)].map((index) => (
                        <Post key={ index } isLoading />
                    )) : postList?.map((obj, index)=> (
                        <Post
                            key={ index }
                            _id={ obj._id }
                            title={ obj.title }
                            imageUrl={ obj.imageUrl }
                            // imageUrl="https://media.istockphoto.com/id/1058262630/vector/creation-responsive-internet-website-for-multiple-platforms-building-mobile-interface-on.jpg?s=1024x1024&w=is&k=20&c=Qrko2b9M1HK7M_5L2CYdj_iNG2xBt6OMJprLd3mmUOM="
                            user={ obj.user }
                            createdAt={ obj.createdAt }
                            viewsCount={ obj.viewsCount }
                            commentsCount={ obj.viewsCount }
                            tags={ obj.tags }
                            isEditable
                        />
                    ))
                    }
                </Grid>
                <Grid size={4}>
                    <TagsBlock items={tags || []} isLoading={ isTagListLoading } />

                    <CommentsBlock items={COMMENT_ITEMS} isLoading={false} />
                </Grid>

            </Grid>
        </>
    );
}
