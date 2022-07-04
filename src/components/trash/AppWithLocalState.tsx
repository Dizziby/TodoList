// import React, {useState} from 'react';
// import './App.css';
// import TodoList from "./components/Todolist";
// import {v1} from "uuid";
// import {FullInput} from "./components/FullInput";
// import ButtonAppBar from "./components/ButtonAppBar";
// import {Container, Grid, Paper} from "@mui/material";
// import {TaskPriorities, TaskStatuses} from "./api/todolistAPI";
// import {FilterValuesType, TodolistDomainType} from "./redux/todolists-reducer";
// import {TasksType} from "./redux/tasks-reducer";
//
//
// function App() {
//
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
//         {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: "", order: 0},
//         {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0},
//     ])
//
//     let [tasks, setTasks] = useState<TasksType>({
//         [todolistID1]: [
//             {
//                 id: v1(),
//                 title: "HTML&CSS",
//                 status: TaskStatuses.Completed,
//                 description: "",
//                 todoListId: todolistID1,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "JS",
//                 status: TaskStatuses.Completed,
//                 description: "",
//                 todoListId: todolistID1,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "ReactJS",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID1,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "Rest API",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID1,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "GraphQL",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID1,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//         ],
//         [todolistID2]: [
//             {
//                 id: v1(),
//                 title: "HTML&CSS2",
//                 status: TaskStatuses.Completed,
//                 description: "",
//                 todoListId: todolistID2,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "JS2",
//                 status: TaskStatuses.Completed,
//                 description: "",
//                 todoListId: todolistID2,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "ReactJS2",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID2,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "Rest API2",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID2,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//             {
//                 id: v1(),
//                 title: "GraphQL2",
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolistID2,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//         ]
//     });
//
//     const removeTodolist = (todolisdID: string) => {
//         setTodolists(todolists.filter(el => el.id !== todolisdID))
//         delete tasks[todolisdID]
//         setTasks({...tasks})
//     }
//
//     const addTask = (todolisdID: string, title: string) => {
//         setTasks({
//             ...tasks, [todolisdID]: [{
//                 id: v1(),
//                 title,
//                 status: TaskStatuses.New,
//                 description: "",
//                 todoListId: todolisdID,
//                 startDate: "",
//                 deadline: "",
//                 addedDate: "",
//                 order: 0,
//                 priority: TaskPriorities.Low
//             },
//                 ...tasks[todolisdID],
//             ]
//         })
//     }
//
//     const removeTask = (todolisdID: string, taskID: string) => {
//         setTasks({...tasks, [todolisdID]: tasks[todolisdID].filter(el => el.id !== taskID)})
//     }
//
//     const changeTaskStatus = (todolisdID: string, taskId: string, status: TaskStatuses) => {
//         setTasks({...tasks, [todolisdID]: tasks[todolisdID].map(el => el.id === taskId ? {...el, status} : el)})
//     }
//
//     const changeFilter = (todolisdID: string, filter: FilterValuesType) => {
//         setTodolists(todolists.map(el => el.id === todolisdID ? {...el, filter: filter} : {...el}))
//     }
//
//     const addTodolist = (newTitle: string) => {
//         let newID = v1()
//         let newTodolist: TodolistDomainType = {
//             id: newID,
//             title: newTitle,
//             filter: 'all',
//             addedDate: "",
//             order: 0
//         }
//         setTodolists([...todolists, newTodolist])
//         setTasks({...tasks, [newID]: []})
//     }
//
//     const changeTodolistTitle = (todolisdID: string, newTitle: string) => {
//         setTodolists(todolists.map(el => el.id === todolisdID ? {...el, title: newTitle} : el))
//     }
//
//     const changeTaskTitle = (todolisdID: string, taskID: string, newTitle: string) => {
//         setTasks({
//             ...tasks,
//             [todolisdID]: tasks[todolisdID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
//         })
//     }
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <FullInput callback={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todolists.map(el => {
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: "10px"}}>
//                                     <TodoList
//                                         key={el.id}
//                                         todolisdID={el.id}
//                                         title={el.title}
//                                         tasks={tasks[el.id]}
//                                         filter={el.filter}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         removeTodolist={removeTodolist}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                         changeTaskTitle={changeTaskTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default App;
export default () => {}