import { expect } from 'chai';
import { getBorderStyleForDate } from '../TodoListItem';

describe('The getBorderStyleForDate', () => {
    it('Returns none when the date is < current date', () =>{
        const today = Date.now();
        const recentDate = new Date(today - 8640000 * 3);

        const expected = 'none';
        const actual = getBorderStyleForDate(recentDate, today);
        expect(actual).to.equal(expected);
    });
    it('Returns a border when the date is more than five days ago', () =>{
        const today = Date.now();
        const recentDate = new Date(today - 8640000 * 5);

        const expected = '2px solid red';
        const actual = getBorderStyleForDate(recentDate, today);
        expect(actual).to.equal(expected);

    });
})