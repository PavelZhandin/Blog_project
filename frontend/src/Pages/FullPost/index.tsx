import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddComment } from "../../Components/AddComment";
import { CommentsBlock } from '../../Components/CommentsBlock';
import { Post } from '../../Components/Post';
import axios from '../../axios';
import { IPost } from '../../Models/IPost';

export function FullPost(): JSX.Element {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData]= useState<IPost>();
    

    useEffect(()=>{
        if (id) {
            axios.get<IPost | undefined>(`/posts/${id}`)
                .then((data) => {
                    console.log(data.data);
                    setPostData(data.data);
                })
                .catch((error) =>{
                    console.warn(error);
                
                    alert('Ошибка при получении статьи');
                }).finally(()=> setLoading(false));
        }

    }, [id]);

    if (isLoading) {
        return <Post isLoading  isFullPost/>;
    }

    return (
        <>
            <Post
                _id={ postData?._id }
                title={ postData?.text }
                imageUrl={postData?.imageUrl}
                user={ postData?.user }
                createdAt={postData?.createdAt}
                viewsCount={ postData?.viewsCount }
                commentsCount={postData?.viewsCount}
                tags={ postData?.tags }
                isFullPost
            >
                <p>
                    { postData?.text }
                </p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
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
