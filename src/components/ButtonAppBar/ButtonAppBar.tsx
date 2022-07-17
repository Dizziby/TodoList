import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import {AppDispatchType, useAppSelector} from "../../redux/store";
import {logoutTC} from "../../redux/reducers/auth-reducer";
import {useDispatch} from "react-redux";

export default function ButtonAppBar() {
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch: AppDispatchType = useDispatch()

    const onClickButtonHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "#3A354D"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onClickButtonHandler}>Login</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress color="inherit"/>}
            </AppBar>
        </Box>
    );
}
