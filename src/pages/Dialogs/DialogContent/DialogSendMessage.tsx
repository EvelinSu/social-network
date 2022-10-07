import React from 'react';
import {STextarea} from "../../../components/Textarea/STextarea";
import Button from "../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/reduxStore";
import {changeNewMessageTextAC, sendMessageAC} from "../../../redux/dialogsReducer";

type TDialogSendMessage = {
    id: string
}

const DialogSendMessage: React.FC<TDialogSendMessage> = (props) => {

    const newMessageText = useSelector<TRootState, string>(state => state.dialogsPage.dialogs[props.id].newMessageText)
    const dispatch = useDispatch()

    const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) return
        if (e.key === 'Enter') {
            e.preventDefault()
            onClickHandler()
        }
    }

    const onClickHandler = () => {
        if (newMessageText.trim() !== '') {
            dispatch(sendMessageAC(newMessageText.trim(), props.id))
            dispatch(changeNewMessageTextAC('', props.id))
        }
    }
    const onChangeSetNewMessageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeNewMessageTextAC(e.currentTarget.value, props.id))
    }

    return (
        <>
            <STextarea
                onKeyPress={onKeyPress}
                onChange={onChangeSetNewMessageText}
                value={newMessageText}
                height={"60px"}
                placeholder={"Write" +
                    " your message..."}
            />
            <Button isDisabled={newMessageText.trim() === ''} label={'Send'} onClick={onClickHandler} />
        </>

    );
};

export default DialogSendMessage;