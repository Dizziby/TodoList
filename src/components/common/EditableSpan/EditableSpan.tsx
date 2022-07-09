import React, {ChangeEvent, useState} from 'react';
import {Input} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEdit(!edit)
        props.callback(newTitle)
    }

    const onDoubleClickHandler = () => {
        if (!props.disabled) {
            setEdit(true)
        }
    }


    return (
        edit
            ?
            <Input style={{fontWeight: "500", color: "#3A354D", maxWidth: "150px"}} value={newTitle}
                   autoFocus onChange={onChangeHandler}
                   onBlur={onBlurHandler}/>
            : <span style={{fontWeight: "500", color: "#3A354D", padding: "10px 0"}}
                    onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )
})