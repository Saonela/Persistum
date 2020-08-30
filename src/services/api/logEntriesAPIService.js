import {FirebaseDB} from "../../firebase";

const logEntriesCollection = FirebaseDB.collection('logEntries');

const LogEntriesAPIService = {
    async getAll() {
        try {
            const response = await logEntriesCollection.get();
            return response.docs.map(doc => doc.data());
        } catch (e) {
            console.log('e', e)
            return [];
        }
    },
    async upsert(logEntry) {
        await logEntriesCollection.doc(logEntry.id).set(logEntry);
    },
    async delete(id) {
        await logEntriesCollection.doc(id).delete();
    }
};

export default LogEntriesAPIService;
