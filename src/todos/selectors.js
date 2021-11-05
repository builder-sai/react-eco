import { createSelector } from 'reselect';
//our separation of concerns
//component only displays data
//reducers manages state
//thunks side-effect logic
//selectors(interfaces/contracts/factory/service)
//helps us separating our logic and work with selectors instead of
//directly refereing the states props, we create functions and 
//use them instead of having all the knowledge about our state
//-move out our mapStateToProps logic to functions in our selectors...
export const getTodos = state => state.todos.data;
//it's just a repo interface, take the state as an argument
//and returns the location in our state that our todos are stored
export const getTodosLoading = state => state.todos.isLoading

//createSelector uses memoization
//argu in = result out, if they are not changed, the createSelector
//would only return the result, skipping the recomputing of the same argument
//that would be the cause with a regular function like
// export const getCompletedTodos = state => {
//     const { data: todos } = state.todos;
//     return todos.filter(todo => todo.isCompleted);
//     //but this would recompute the todos every time it's called,
//     //that's why we use the createSelector below
// }

export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted)
);
export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted)
);