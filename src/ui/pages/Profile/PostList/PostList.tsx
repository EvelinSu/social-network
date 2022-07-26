import React, {FC} from 'react';
import {Box} from "../../../common/Box/Box";
import {STitle} from "../../../common/Text/STitle";
import Post from "../Post/Post";
import {SText} from "../../../common/Text/SText";
import AddPost from "./AddPost";
import {useAppSelector} from "../../../../common/hooks";
import {shallowEqual} from "react-redux";
import {useTheme} from "styled-components";
import {TDefaultTheme} from "../../../styles/baseTheme";

type TPostListProps = {
    avatar: string,
    name: string,
    myId: number
}
const PostList: FC<TPostListProps> = (props) => {
    const theme = useTheme() as TDefaultTheme

    const posts = useAppSelector(state => state.posts, shallowEqual)
    const userId = useAppSelector(state => state.profile.activeProfile.userId)

    return (
        <>
            <Box gap={20} flexDirection={"column"}>
                <Box alignItems={"center"} gap={10}>
                    <STitle color={theme.colors.primaryLightest}>
                        Demo posts
                    </STitle>
                    <SText opacity={0.4} title={'Всего постов'}>
                        ({posts.postsList.length})
                    </SText>
                </Box>
                {props.myId === userId && (
                    <AddPost newPostText={posts.newPostText} />
                )}
            </Box>
            {posts.postsList.length > 0
                ? <Box gap={25} flexDirection={"column"}>
                    {posts.postsList.map((post) => (
                        <Post
                            avatar={props.avatar}
                            key={post.id}
                            post={post}
                        />
                    ))}
                </Box>
                : <Box justifyContent={"center"} opacity={0.3}>
                    there are no posts
                </Box>
            }
        </>
    );
};

export default PostList;