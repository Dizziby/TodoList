import {
    addTodoListTC,
    changeTodoListFilterAC, changeTodoListTC,
    FilterValuesType, removeTodoListTC,
    TodoListDomainType,
    todoListsReducer
} from "../reducers/todo-lists-reducer";
import {v1} from 'uuid';


let todolistId1: string
let todolistId2: string

let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        }
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListTC.fulfilled({todolistId: todolistId1}, "", todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = {
        id: v1(),
        title: 'New todolist',
        addedDate: "",
        order: 0
    }

    const endState = todoListsReducer(startState, addTodoListTC.fulfilled({todolist: newTodolistTitle}, "", 'New todolist'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New todolist');
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, changeTodoListTC.fulfilled({
        id: todolistId2,
        title: newTodolistTitle
    }, "", { todoListId: todolistId2, newTitle: newTodolistTitle }));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListsReducer(startState, changeTodoListFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

export default () => {
}