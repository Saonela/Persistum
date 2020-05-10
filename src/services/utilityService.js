import moment from "moment";

const UtilityService = {
    generateId () {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    deepCopy(d) {
        if (!d) {
            return d;
        }
        return JSON.parse(JSON.stringify(d));
    },
    getCurrentShortTimestamp() {
        return moment().utc().format('YYYY-MM-DD');
    }
};

export default UtilityService;
