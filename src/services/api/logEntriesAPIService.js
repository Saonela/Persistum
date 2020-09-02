import {FirebaseDB} from "../../firebase";

const getLogEntriesCollection = (userId) => FirebaseDB.collection('accounts').doc(userId).collection('logEntries');

const LogEntriesAPIService = {
    async getAll(userId) {
        try {
            const response = await getLogEntriesCollection(userId).get();
            return response.docs.map(doc => doc.data());
        } catch (e) {
            console.log('LogEntriesAPIService.getAll error', e)
            return [];
        }
    },
    async upsert(logEntry, userId) {
        await getLogEntriesCollection(userId).doc(logEntry.id).set(logEntry);
    },
    async delete(id, userId) {
        await getLogEntriesCollection(userId).doc(id).delete();
    }
};

export default LogEntriesAPIService;
