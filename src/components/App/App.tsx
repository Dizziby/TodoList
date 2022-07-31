import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import {CircularProgress, Container} from "@mui/material";
import {TodolistsList} from "../TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {initializeAppTC} from "../../redux/reducers/app-reducer";
import {AppDispatchType} from "../../redux/store";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../common/hooks/useAppSelector";

function App({demo = false}: AppPropsType) {
    debugger
    const dispatch: AppDispatchType = useDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/todolist" element={<Navigate to={"/"}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;

// =============================Types=============================

type AppPropsType = {
    demo?: boolean
}