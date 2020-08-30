import {FirebaseDB} from "../../firebase";

const activitiesCollection = FirebaseDB.collection('activities');

const ActivityAPIService = {
    async getAll() {
        try {
            let activities = await activitiesCollection.get();
            return activities.docs.map(doc => doc.data());
        } catch (e) {
            console.log('e', e)
            return [];
        }
    },
    async create(activity) {
        await activitiesCollection.doc(activity.id).set(activity);
    },
    async update(activity) {
        await activitiesCollection.doc(activity.id).update(activity);
    },
    async delete(id) {
        await activitiesCollection.doc(id).delete();
    }
};

export default ActivityAPIService;
