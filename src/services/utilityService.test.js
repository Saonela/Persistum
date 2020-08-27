import UtilityService from "./utilityService";

describe('UtilityService', () => {
    it('should deep copy given item', () => {
        expect(UtilityService.deepCopy(null)).toEqual(null);
        expect(UtilityService.deepCopy(undefined)).toEqual(undefined);
        expect(UtilityService.deepCopy(5)).toEqual(5);
        expect(UtilityService.deepCopy('abc')).toEqual('abc');
        expect(UtilityService.deepCopy({ a: '1235', b: 'abcd' })).toEqual({ a: '1235', b: 'abcd' });
        expect(UtilityService.deepCopy({ a: '1235', b: 'abcd' })).not.toBe({ a: '1235', b: 'abcd' });
        expect(UtilityService.deepCopy([{ a: 5 }, 123, 'abc'])).toEqual([{ a: 5 }, 123, 'abc']);
        expect(UtilityService.deepCopy([{ a: 5 }, 123, 'abc'])).not.toBe([{ a: 5 }, 123, 'abc']);
        const variable = {a: {b: 20}};
        const res = UtilityService.deepCopy(variable);
        variable.a.b = 18;
        expect(res).not.toEqual(variable);
    });

    it('should get timestamp year', () => {
        expect(UtilityService.getTimestampYear('2020-05-23')).toEqual('2020');
    });

    it('should get timestamp month', () => {
        expect(UtilityService.getTimestampMonth('2020-05-23')).toEqual('5');
        expect(UtilityService.getTimestampMonth('2020-11-23')).toEqual('11');
    });
});
