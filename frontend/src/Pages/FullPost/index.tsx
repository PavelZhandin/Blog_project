import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddComment } from "../../Components/AddComment";
import { CommentsBlock } from '../../Components/CommentsBlock';
import { Post } from '../../Components/Post';
import Markdown from 'react-markdown';
import axios from '../../axios';
import { IPost } from '../../Models/IPost';

export function FullPost(): JSX.Element {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData]= useState<IPost>();
    

    useEffect(()=>{
        if (id) {
            axios.get<IPost | undefined>(`/posts/${id}`)
                .then((res) => {
                    setPostData(res.data);
                })
                .catch((error) =>{
                    console.warn(error);
                
                    alert('Ошибка при получении статьи');
                }).finally(()=> setLoading(false));
        }

    }, [id]);

    if (isLoading) {
        return <Post isLoading isFullPost/>;
    }

    return (
        <>
            <Post
                _id={ postData?._id }
                title={ postData?.title }
                imageUrl={`http://localhost:4444${postData?.imageUrl}`}
                user={ postData?.user }
                createdAt={postData?.createdAt}
                viewsCount={ postData?.viewsCount }
                commentsCount={postData?.viewsCount}
                tags={ postData?.tags }
                isFullPost
            >
                <Markdown> 
                    { postData?.text }
                </Markdown>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            _id: '111',
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            _id: '222',
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <AddComment />
            </CommentsBlock>
        </>
    );
}
