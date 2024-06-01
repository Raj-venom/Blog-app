import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components/index"
import { Query } from 'appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from "../features/post/postSlice"

function AllPosts() {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData)
    const oldPosts = useSelector((state) => state.post.oldPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        setPosts(oldPosts)
        appwriteService.getPosts([Query.equal("userId", userData.$id)]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                const oldPosts = posts.documents;
                dispatch(getPost({oldPosts}))
            }
        })
    }, [])


    return (
        <div className=' w-full py-8'>
            <Container>
                <div className=' flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className=' p-2 w-1/4' >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts