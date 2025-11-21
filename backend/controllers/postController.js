import Post from '../models/Post.js';

export async function getAll (req, res) {
    try {
        const posts = await Post.find().populate({ path: 'user', select: ["fullName", "_id"]}).exec();

        if (!posts) {
            res.json({
                message:"Посты не найдены",
            })
        } else {
            res.json(posts)
        }

    } catch (err) {
        console.log('Ошибка получения списка постов:', err)
    }
}

export async function getById (req, res) {
    try {
        const id = req.params?.id;
        const post = await Post.findOneAndUpdate({
            _id: id,
        }, {
            $inc: { viewsCount: 1 },
        }, {
            returnDocument: 'after',
        });

        if (!post) {
            return res.status(404).json({
                message: "Статья не найдена",
            })
        }

        res.send(post);
        

    } catch (err) {
        console.log('Ошибка получения поста по id:', err);
        return res.status(500).json({
            message: "Пост не найден",
        })
    }
}

export async function deletePost (req, res) {
    try {
        const postId = req.params.id;

        await Post.findOneAndDelete({
             _id: postId, 
        })
        .then(doc => {

            if(!doc){
                res.json({
                    message: "Статья с указанным id не найдена",
                })
            }
            console.log('Успешно удалена статья', doc);

            res.json({
                doc,
            })
        })
        .catch((err) => {
            console.log(err);

            return res.status(500).json({
                message: "Не удалось удалить статью."
            })
        })

    } catch (err) {
        console.log('Необработанная ошибка удаления статьи', err);
        return res.status(500).json({
            message: "Необработанная ошибка удаления статьи",
        })
    }
}

export async function updatePost (req, res) {
    try {
        const postId = req.params.id;

        await Post.findByIdAndUpdate({
             _id: postId, 
        },{
           title: req.body.title,
           text: req.body.text,
           imageUrl: req.body.imageUrl,
           user: req.userId,
           tags: req.body.tags, 
        })
        .then(doc => {
            if (!doc){
                res.json({
                    message: "Статья с указанным id не найдена",
                })
            }
            console.log('Успешно обновлена статья', doc);

            res.json({
                doc,
            })
        })
        .catch((err) => {
            console.log(err);

            return res.status(500).json({
                message: "Не удалось обновить статью."
            })
        })

    } catch (err) {
        console.log('Необработанная ошибка удаления статьи', err);
        return res.status(500).json({
            message: "Необработанная ошибка удаления статьи",
        })
    }
}

export async function createPost (req, res) {
    console.log(req.body)

    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post)
    } catch(err) {
        console.log('Ошибка создания поста:', err);
        res.status(500).json({
            message: "Не удалось создать пост",
        })
    }
}
