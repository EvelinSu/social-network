import styled from "styled-components";
import {DefaultInputPropsType} from "./Input";

export const SForm = styled.form((props) => ({
    display: "flex",
    flexDirection: "column",
    gap: 25,
    justifyContent: "inherit",
}))

export const SInputWrapper = styled.div<{ error?: string }>(({theme, ...props}) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flexGrow: 1,
    position: "relative",
    ...props.error && {
        "&:after": {
            content: `'${props.error}'`,
            position: "absolute",
            left: "calc(100% + 10px)",
            maxWidth: 200,
            width: "max-content",
            backgroundColor: theme.colors.status.error,
            padding: "3px 10px",
            fontSize: 12,
            zIndex: theme.orders.inputErrors,
            borderRadius: 5,
            opacity: 0,
            transition: "0.2s",
        },
        "&:hover": {
            "&:after": {
                opacity: 1
            }
        },
    }
}))

type TSInputProps = {
    isError?: boolean
}

export const SInput = styled.input<DefaultInputPropsType & TSInputProps>(({theme, ...props}) => ({
    padding: "8px 15px",
    borderRadius: theme.blockSettings.borderRadius,
    backgroundColor: theme.colors.input.default,
    outline: `1px solid transparent`,
    width: "100%",
    "&:hover": {
        opacity: 0.8
    },
    "&:focus": {
        outline: `1px solid ${theme.colors.primaryLightest}`,
        opacity: 1,
    },
    ...props.isError && {
        outline: `1px solid ${theme.colors.status.error}`,
        "&:focus": {
            outline: `1px solid ${theme.colors.status.error}`,
        },
    }
}))
