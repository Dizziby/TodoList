import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

// =====================Todolist===================

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("TEST")
            .then( (res) => {
            setState(res.data);
        } )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4e09c7e1-40b6-4173-85b2-461ebc0e76b0';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b6b2d5d1-1ddc-45e3-90fb-6dfe742055c8'
        todolistAPI.updateTodolist(todolistId, 'REACT>>>>>>>>>')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

// =====================Task===================

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dec8e497-312f-4ade-bd5a-052840bfff11'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dec8e497-312f-4ade-bd5a-052840bfff11'
        const title = "Storybook task1"
        todolistAPI.createTask(todolistId, title)
            .then( (res) => {
                setState(res.data);
            } )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dec8e497-312f-4ade-bd5a-052840bfff11';
        const taskId = "2b75735a-618c-4ee8-bc59-f5db6cc8def2"
        todolistAPI.deleteTask(todolistId, taskId)
            .then( (res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dec8e497-312f-4ade-bd5a-052840bfff11'
        const taskId = "51dd0694-96a3-41fa-ad31-c0351a9caa97"
        const model = {
            title: "New title",
            description: "New description",
            completed: false,
            status: 0,
            priority: 0,
            startDate: "",
            deadline: ""
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}