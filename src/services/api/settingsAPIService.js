import {FirebaseDB} from "../../firebase";

const getSettingsField = (userId) => FirebaseDB.collection('accounts').doc(userId);

const SettingsAPIService = {
    async get(userId) {
        try {
            const response = await getSettingsField(userId).get();
            const settings = response.data().settings;
            return settings ? settings : {};
        } catch (e) {
            console.log('SettingsAPIService.getAll error', e)
            return [];
        }
    },
    async update(settings, userId) {
        await getSettingsField(userId).update({settings});
    },
};

export default SettingsAPIService;
