import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { PostCard, Container } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/post/postSlice'

function Home() {

    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.status)
    const oldPosts = useSelector(state => state.post.oldPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        setPosts(oldPosts)
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                const oldPosts = posts.documents
                dispatch(getPost({oldPosts}))
            }
        })
    }, [userData])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">

                                {
                                    userData ? <div>Oops no posts available</div> : <div>Login to read posts</div>
                                }
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home