import { createContext } from "react";
import { useProvidePosts } from "../hooks";

const initialState ={
    posts: [],
    loading: true,
    postcreationhook :() => {},
    commentaddition:() => {},
    postcommenttogglelike:() => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({children}) => {
    const post = useProvidePosts();
    console.log("called",post);

    return( 
    <PostsContext.Provider value={post}>{children}</PostsContext.Provider>
    )
}


