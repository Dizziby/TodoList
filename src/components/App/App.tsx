import React from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import {Container} from "@mui/material";
import {TodolistsList} from "../TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";

function App() {
    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;
