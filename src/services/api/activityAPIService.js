
let id = 0;

const ActivityAPIService = {
    create(name) {
        id++;
        return new Promise((resolve) => {
            resolve({
                id: id,
                name: name
            })
        });
    },
    update(activity) {
        return new Promise((resolve) => {
            resolve(JSON.parse(JSON.stringify(activity)))
        });
    },
    delete(id) {
        return new Promise((resolve) => {
            resolve()
        });
    }
};

export default ActivityAPIService;
