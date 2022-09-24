import {addTodoListTC, TodoListDomainType, todoListsReducer} from "../reducers/todo-lists-reducer";
import {tasksReducer, TasksType} from "../reducers/tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    const newTodolist = {
        id: v1(),
        title: 'New todolist',
        addedDate: "",
        order: 0
    }

    const action = addTodoListTC.fulfilled({todolist: newTodolist}, "", 'New todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload?.todolist.id);
    expect(idFromTodoLists).toBe(action.payload?.todolist.id);
});

export default () => {}