import { expect, expected } from 'chai'
import { getCompletedTodos } from '../selectors';

//reselect library has a resultfunc
//that returns the last functions result that was passed in the createSelector

describe('The getCompletedTodoSelector', () => {
    it('Returns only completed todos ', () => {
        const fakeTodos = [{
            text: 'abc',
            isCompleted: true
        },
        {
            text: 'xyz',
            isCompleted: false
        },
        {
            text: 'finished',
            isCompleted: false
        }];
        const expected = [{text: 'abc', isCompleted: true}];
        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    })
})