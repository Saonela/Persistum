import filtersReducer, {toggleFilter} from "./filtersSlice";

describe('FiltersReducer', () => {

    const state = [111, 777];

    it('should add id', () => {
        expect(filtersReducer(state, toggleFilter(55))).toEqual([111, 777, 55]);
    });

    it('should remove id if it exists', () => {
        expect(filtersReducer(state, toggleFilter(777))).toEqual([111]);
    });

});
