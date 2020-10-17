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
    },
    async updateMany(logEntries, userId) {
        const batch = FirebaseDB.batch();
        logEntries.forEach((logEntry) => {
            const doc = getLogEntriesCollection(userId).doc(logEntry.id);
            batch.update(doc, logEntry);
        });
        batch.commit().then();
    },
    async deleteMany(logEntries, userId) {
        const batch = FirebaseDB.batch();
        logEntries.forEach((logEntry) => {
            const doc = getLogEntriesCollection(userId).doc(logEntry.id);
            batch.delete(doc);
        });
        batch.commit().then();
    },
};

export default LogEntriesAPIService;
