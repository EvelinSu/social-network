import React, {FC, Fragment} from "react";
import {SDialogWindowBody, SDialogWindowFooter, SDialogWindowHeader} from "../styled";
import {SAvatar} from "../../../components/Avatar/SAvatar";
import {Box} from "../../../components/Box/Box";
import {STitle} from "../../../components/Text/STitle";
import {SText} from "../../../components/Text/SText";
import {SScrollContainer} from "../../../components/ScrollContainer/ScrollContainer";
import Message from "../../../components/Message/Message";
import {TMessage} from "../../../redux/types";
import {TDialogs} from "../../../redux/dialogsReducer";
import {DialogSendMessageContainer} from "./DialogSendMessageContainer";
import {TUser} from "../../../redux/usersReducer";

type TDialogContentProps = {
    dialogs: TDialogs
    messages: TMessage[]
    id: string
    user?: TUser,
}

const DialogContent: FC<TDialogContentProps> = ({
    dialogs,
    messages,
    user,
    id

}) => {
    const activeMessagesId = id ? dialogs[id].messagesId : "0"
    const activeMessages = messages.filter((el) => activeMessagesId.includes(el.id))

    return (
        <Fragment>
            <SDialogWindowHeader>
                <SAvatar
                    size={40}
                    src={user && user.photos.small }
                />
                <Box gap={1} flexDirection={"column"}>
                    <STitle>
                        {user && user.name}
                    </STitle>
                    <SText opacity={0.5} fontSize={"14px"}>
                        last seen: {'recently'}
                    </SText>
                </Box>
            </SDialogWindowHeader>
            <SDialogWindowBody>
                <SScrollContainer>
                    {
                        activeMessages.length > 0
                            ? activeMessages.map((message) => (
                                <Message
                                    key={message.id}
                                    text={message.text}
                                    time={message.time}
                                    me={message.me}
                                />
                            ))
                            : ''
                    }
                </SScrollContainer>
            </SDialogWindowBody>
            <SDialogWindowFooter>
                <DialogSendMessageContainer id={id} />
            </SDialogWindowFooter>
        </Fragment>
    );
};

export default DialogContent;

