import { expect } from 'chai';
import { loadTodos, loadtodos } from '../thunks';
import sinon from 'sinon';
import 'node-fetch';
import fetchMock from 'fetch-mock';

//our loadTodos thunk has 3 objectives (dispatch loadtodoInprog,
//load actual data from our server, and dispatch our loadTodoSuccess with
//the todos from the server

//for that we need to install 3 packages sinon node-fetch fetch-mock
//after installing we can moch the fetching and dispatching of our funcs
//we installed sinon to pass fake function that can be dispatch so we can
//check what arguments were passed in
describe("the loadTodos thunk", () =>{
    it('Dispatches the correct actions in the success senario', async () => {
        //sinon spy keeps track of which arguments it was called with
        const fakeDispatch = sinon.spy();
        
        //define what we want our fake fetch to return when
        //our thunk calls it
        const fakeTodos = [{ text:'test'}, {test:'abc'}];
        //our url that we get our data from
        fetchMock.get('http://localhost:8080/todos', fakeTodos);
        //the above help that when our thunk trys to fetch our fetchMock will
        //return the fakeTodos instead of sending an acutal fetch request.
        //this will however change the behavior of our regular fetch so we have
        //to reset the fetchMock at the end of our test with fetchMock.reset();
        
        const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS'};
        const expectedSecondAction = {
            type: 'LOAD_TODOS_SUCCESS',
            payload: {
                todos: fakeTodos
            }};
            
            //now we do the actual test
            await loadTodos()(fakeDispatch);
            //first dispatch fakeDispatch.getCall(0)
            //.args[0] = first argument that was passed during the first call to 
            //fakeDispatch
            expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
            expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);
            
            fetchMock.reset();
            
        });
    })