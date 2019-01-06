export function grouper(data) {
    try {
        const groups = {};
        const result = [];
        data.forEach(group => {
            let groupID = '';
            group.forEach(asset => {
                groupID += asset.index;
            });
            if (groupID in groups) {
                groups[groupID].push(group);
            } else {
                groups[groupID] = [group];
            }
        });
        Object.values(groups).forEach(group => {
            result.push({
                group: group[0],
                number: group.length,
            });
        });
        return { err: null, result };
    } catch (err) {
        return { err, result: null };
    }
}
