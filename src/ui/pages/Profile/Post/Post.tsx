import React, {FC, useState} from "react";
import FavoriteIcon from "../../../assets/icons/FavoriteIcon";
import FavoriteFillIcon from "../../../assets/icons/FavoriteFillIcon";
import Avatar from "../../../common/Avatar/Avatar";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks";
import {authModalToggleAC} from "../../../../bll/authReducer";
import {TPost} from "../../../../bll/postsReducer";
import {SPost, SPostContent, SPostDate, SPostPanel, SPostText} from "./styled";

type TPostProps = {
    post: TPost
    avatar: string
}
const Post: FC<TPostProps> = React.memo(({post, avatar}) => {
    const dispatch = useAppDispatch()

    const [likes, setLikes] = useState<number>(post.likes)
    const [isLiked, setIsLiked] = useState<boolean>(post.isLiked)

    const isAuth = useAppSelector(state => state.auth.isAuth)

    const onClickHandler = () => {
        if (isAuth) {
            setIsLiked(!isLiked);
            isLiked
                ? setLikes(likes - 1)
                : setLikes(likes + 1)
        } else {
            dispatch(authModalToggleAC(true))
        }
    }

    return (
        <SPost>
            <Avatar img={avatar} />
            <SPostContent>
                <SPostText>
                    {post.text}
                </SPostText>
                <SPostDate>{post.date}</SPostDate>
            </SPostContent>
            <SPostPanel
                likes={likes}
                onClick={() => onClickHandler()}
            >
                {isLiked ? <FavoriteFillIcon /> : <FavoriteIcon />}
            </SPostPanel>
        </SPost>
    )
})

export default Post;

