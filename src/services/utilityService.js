import moment from "moment";

const UtilityService = {
    generateId() {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 20; i++) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    },
    deepCopy(d) {
        if (!d) {
            return d;
        }
        return JSON.parse(JSON.stringify(d));
    },
    getCurrentShortTimestamp() {
        console.log('GET CURRENT SHORT TIMESTAMP', moment().utc().format('YYYY-MM-DD'))
        return moment().utc().format('YYYY-MM-DD');
    },
    getTimestampYear(timestamp) {
        return timestamp.slice(0, 4);
    },
    getTimestampMonth(timestamp) {
        return parseInt(timestamp.slice(5, 7), 10).toString();
    }
};

export default UtilityService;
