import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsAuthorized } from '../../redux/slices/auth';
import { useNavigate, useParams } from 'react-router';
import axios from '../../axios';
import { fetchPostById } from '../../redux/slices/posts';

export const AddPost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const isAuth = useAppSelector(selectIsAuthorized);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if (!isAuth && !window.localStorage.getItem('token')) {
            navigate('/');
        }

    }, [isAuth]);

    useEffect(()=>{
        if (id) {
            setIsLoading(true);
            dispatch(fetchPostById(id)).unwrap()
                .then((postData)=>{
                    setText(postData.text);
                    setTitle(postData.title);
                    setTags(postData?.tags.join(','));
                    postData?.imageUrl && setImageUrl(postData?.imageUrl);
                })
                .catch((err)=> {
                    console.warn(err);
                    alert('Не удалось получить данные поста');
                });
        }

    }, [id]);

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            const file = event.target.files?.[0];

            file && formData.append('image', file);
            
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data?.url);
        } catch (error) {
            console.warn(error);
            alert('Ошибка при загрузке файла!');
        }
    };

    const onClickRemoveImage = async () => {
        setImageUrl(null);
    };

    const handleChangeValue = useCallback((value: string) => {
        setText(value);
    }, []);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const fields = {
                title,
                imageUrl,
                tags: tags.split(','),
                text,
            };

            const { data } = id 
                ? await axios.put(`/posts/${id}`, fields)
                : await axios.post('/posts/create', fields);
            const postId = id || data?._id;

            postId && navigate(`/posts/${postId}`);
        } catch (err) {
            console.warn(err);
            alert('Не удалось создать пост');
        } finally {
            setIsLoading(false);
        }
    };

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Начинайте вводить текст статьи',
            status: true,
            autosave: {
                uniqueId: "1",
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <Paper style={{ padding: 30 }}>
            <Button onClick={() => inputRef?.current?.click() } variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={ inputRef } type="file" onChange={handleChangeFile} hidden />
            {imageUrl && (
                <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Удалить
                </Button>
            )}
            {imageUrl && (
                <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
            )}
            <br />
            <br />
            <TextField
                value={title}
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) }
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
            />
            <TextField
                value={tags}
                classes={{ root: styles.tags }}
                variant="standard" placeholder="Тэги"
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value) }
                fullWidth
            />
            <SimpleMDE
                placeholder='Начинайте вводить текст статьи'
                className={styles.editor}
                value={ text }
                onChange={ handleChangeValue }
                options={options}
            />
            <div className={styles.buttons}>
                <Button onClick={ handleSubmit } size="large" variant="contained">
                    {id ? 'Сохранить изменения': 'Опубликовать' }
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
