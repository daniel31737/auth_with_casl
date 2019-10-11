import { AbilityBuilder } from '@casl/ability';
import storage from '../config/storage_cf';

const currentUser = storage.fetch('currentUser');

function subjectName(item) {
    if (!item || typeof item === 'string') {
        return item
    }
    return item.__type
}

export default AbilityBuilder.define({ subjectName }, can => {
    if (currentUser.role === 1) {
        can(['create', 'read'], 'Blog');
        can(['delete'], 'Blog', {author: currentUser.username});
    } else {
        can('read', 'Blog');
    }
})