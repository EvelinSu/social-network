import styled from "styled-components";

export const SSiteWrapper = styled.div(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    gap: 30,
    columnGap: 30,
    background: `linear-gradient(to left bottom, ${theme.colors.secondary}, ${theme.colors.primaryLight})`,
    height: "100vh",
    width: "100%",
    color: theme.colors.text,
    minWidth: 800,
}))

export const SSiteContainer = styled.div(props => ({
    display: "flex",
    height: "100%",
    width: "100%",
    maxWidth: 950,
}))

export const SSiteContent = styled.div<{ stylized?: boolean }>(({stylized, theme}) => ({
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    width: "100%",
    gap: 20,
    columnGap: 25,
    rowGap: 25,
    padding: "30px 30px 30px 0",
    ...stylized && {
        padding: "30px",
        margin: "30px 0",
        borderRadius: theme.blockSettings.borderRadius,
        background: `linear-gradient(to left bottom, ${theme.colors.secondary}, ${theme.colors.primaryLight})`,
    }
}))