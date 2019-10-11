export default {
    
    fetch(storage_name) {
        const storageName = JSON.parse(localStorage.getItem(storage_name) || '[]');
        return storageName;
    },

    save(storage_name, info_state) {
        localStorage.setItem(storage_name, JSON.stringify(info_state))
    }
}