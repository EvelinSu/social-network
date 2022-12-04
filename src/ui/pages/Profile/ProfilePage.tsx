import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Box} from "../../common/Box/Box";
import {SText} from "../../common/Text/SText";
import {STitle} from "../../common/Text/STitle";
import {theme} from "../../styles/constants";
import {SSiteContent} from "../../layout/styled";
import Button from "../../common/Button/Button";
import {getProfile, putStatus} from "../../../bll/profileReducer";
import userPhoto from "../../assets/img/default-photo.png";
import IconLink from "../../common/IconLink/IconLink";
import {iconsDictionary} from "../../assets/icons/contacts/_iconsDictionary";
import {useParams} from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import Posts from "./Posts/Posts";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import EditableText from "../../common/EditableText/EditableText";
import Avatar from "../../common/Avatar/Avatar";
import {authModalToggleAC} from "../../../bll/authReducer";

const ProfilePage = () => {
    const dispatch = useAppDispatch()

    const {id} = useParams<{ id: string }>()
    const userId = Number(id);

    const [follow, setIsFollow] = useState(false)

    const {activeProfile, isFetching, status} = useAppSelector(state => state.profile)
    const myId = useAppSelector(state => state.auth.account.id)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const setStatusHandler = useCallback((newStatus: string) => {
        dispatch(putStatus(newStatus))
    }, [dispatch])

    const mappedContacts = Object.entries(activeProfile.contacts).map((contact) => {
        if (contact[1]) {
            return {
                label: contact[0],
                link: contact[1],
                icon: iconsDictionary[contact[0]]
            }
        }
    }).filter(el => el)

    useLayoutEffect(() => {
        dispatch(getProfile(userId))
    }, [id])

    return (
        isFetching
            ? <LoaderIcon />
            : (<SSiteContent stylized>
                <Box alignItems={"center"} gap={20}>
                    <Avatar
                        size={"large"}
                        img={activeProfile.photos.large || userPhoto}
                    />
                    <Box flexDirection={"column"} overflow={"hidden"}>
                        <STitle margin={"0 0 0 10px"} color={theme.colors.primaryLightest}>
                            {activeProfile.fullName}
                        </STitle>
                        <EditableText
                            myId={myId}
                            currentId={activeProfile.userId}
                            text={status}
                            setText={setStatusHandler}
                            placeholder={"- the user is silent -"}
                            maxLength={300}
                            title={'Click to change status'}
                        />
                        <Box margin={"0 0 0 10px"} gap={13}>
                            {mappedContacts.length > 0
                                ? mappedContacts.map((el) => (
                                    <IconLink
                                        key={el?.label}
                                        label={el?.label}
                                        link={el?.link}
                                        icon={el?.icon}
                                    />
                                ))
                                : <SText opacity={0.3}>
                                    - no contacts -
                                </SText>}
                        </Box>
                        <SText margin={"0 0 0 10px"}>
                            {activeProfile.lookingForAJob && activeProfile.lookingForAJobDescription}
                        </SText>
                    </Box>
                    <Box
                        flexDirection={"column"}
                        alignItems={"flex-end"}
                        gap={20}
                        margin={"0 0 auto auto"}
                    >
                        {activeProfile.userId !== myId && (
                            <Button
                                backgroundColor={follow ? theme.colors.button.active : theme.colors.button.cancel}
                                label={follow ? 'unfollow' : 'follow'}
                                onClick={() => isAuth ? setIsFollow(!follow) : dispatch(authModalToggleAC(true))}
                            />
                        )}
                        <Box>
                            <Button label={'friends'} onClick={() => alert("in progress")} />
                        </Box>
                    </Box>
                </Box>
                <Posts
                    myId={myId}
                    name={activeProfile.fullName}
                    avatar={activeProfile.photos.small || userPhoto}
                />
            </SSiteContent>)

    );
};

export default ProfilePage;
