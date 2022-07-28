// import {addTodolistAC, TodolistDomainType, todolistsReducer} from "../reducers/todolists-reducer";
// import {tasksReducer, TasksType} from "../reducers/tasks-reducer";
// import {v1} from "uuid";
//
// test('ids should be equals', () => {
//     const startTasksState: TasksType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     const newTodolist = {
//         id: v1(),
//         title: 'New todolist',
//         addedDate: "",
//         order: 0
//     }
//
//     const action = addTodolistAC(newTodolist);
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.payload.todolist.id);
//     expect(idFromTodolists).toBe(action.payload.todolist.id);
// });
//
export default () => {}