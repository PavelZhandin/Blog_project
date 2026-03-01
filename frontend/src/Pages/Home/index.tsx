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
                <Grid size={8}>
                    {[...Array(5)].map((index) => (
                        <Post
                            key={index}
                            _id={index}
                            title="Roast the #code"
                            imageUrl="https://media.istockphoto.com/id/1058262630/vector/creation-responsive-internet-website-for-multiple-platforms-building-mobile-interface-on.jpg?s=1024x1024&w=is&k=20&c=Qrko2b9M1HK7M_5L2CYdj_iNG2xBt6OMJprLd3mmUOM="
                            user={{
                                avatarUrl: '',
                                fullName: "Keff"
                            }}
                            createdAt={'12 июня 2022 г.'}
                            viewsCount={ 150 }
                            commentsCount={ 3 }
                            tags={['react', 'fun', 'typescript']}
                            isEditable
                        />
                    ))}
                </Grid>
                <Grid size={4}>
                    <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
                    <CommentsBlock items={COMMENT_ITEMS} isLoading={ false } />
                </Grid>
        
            </Grid>
        </>
    );
}
