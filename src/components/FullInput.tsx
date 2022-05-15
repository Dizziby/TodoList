import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type FullInputPropsType = {
    callback: (title: string) => void
}

export const FullInput: React.FC<FullInputPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onKeyPressOnClickAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()

    const onClickAddTask = () => {
        if (title.trim()) {
            props.callback(title.trim())
            setTitle("")
        } else {
            setError(true)
        }
    }

    const inputClasses = error ? "error" : "";

    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeSetTitle}*/}
            {/*    onKeyPress={onKeyPressOnClickAddTask}*/}
            {/*    className={inputClasses}*/}
            {/*/>*/}

            <TextField id="outlined-basic" label={error ? "Title is required" : "Title"} variant="outlined"
                       size="small" value={title} error={error}
                       onChange={onChangeSetTitle} onKeyPress={onKeyPressOnClickAddTask}/>


            {/*<button onClick={onClickAddTask}>+</button>*/}

            <Button variant="contained" size="small"
                    style={{
                        maxWidth: '39px',
                        maxHeight: '39px',
                        minWidth: '39px',
                        minHeight: '39px',
                        backgroundColor:"#7F77E0",
                        color: "black",
                        marginLeft: "10px"
                    }}
                    onClick={onClickAddTask}>+</Button>


            {/*{error && <div style={{color: "red", fontWeight: 700}}>Title is required</div>}*/}
        </div>
    );
};