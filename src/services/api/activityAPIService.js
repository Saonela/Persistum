import {FirebaseDB} from "../../firebase";

const getActivitiesCollection = (userId) => FirebaseDB.collection('accounts').doc(userId).collection('activities');

const ActivityAPIService = {
    async getAll(userId) {
        try {
            let activities = await getActivitiesCollection(userId).get();
            return activities.docs.map(doc => doc.data());
        } catch (e) {
            console.log('ActivityAPIService.getAll error', e)
            return [];
        }
    },
    async create(activity, userId) {
        await getActivitiesCollection(userId).doc(activity.id).set(activity);
    },
    async update(activity, userId) {
        await getActivitiesCollection(userId).doc(activity.id).update(activity);
    },
    async delete(id, userId) {
        await getActivitiesCollection(userId).doc(id).delete();
    }
};

export default ActivityAPIService;
