import { Grid, Tab, Tabs } from "@mui/material";
import { JSX } from "react";
import { CommentsBlock } from "../../Components/CommentsBlock";
import { COMMENT_ITEMS } from "../../mockData/CommentItems";
import { Post } from "../../Components/Post";
import { TagsBlock } from "../../Components/TagsBlock";

export function Home (): JSX.Element {
    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0}>
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid columns={{ xs: 8 }}>
                    {[...Array(5)].map((index) => (
                        <Post
                            title="Roast the #code"
                            imageUrl=""
                            key={index}
                            id={index}
                            user={{
                                avatarUrl: '',
                                fullName: "FullName 1"
                            }}
                            createdAt={'12 июня 2022 г.'}
                            viewsCount={ 150 }
                            commentsCount={ 3 }
                            tags={['react', 'fun', 'typescript']}
                            isEditable
                        />
                    ))}
                </Grid>
                <Grid columns={{ xs: 12 }}>
                    <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
                    <CommentsBlock items={COMMENT_ITEMS} isLoading={ false } />
                </Grid>
        
            </Grid>
        </>
    );
}
