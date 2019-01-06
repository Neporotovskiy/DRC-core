export function linker(sequence, data) {
    try {
        const result = [];
        sequence.forEach(({ group, number }) => {
            const updatedGroup = [];
            group.forEach(({ index }) => {
                updatedGroup.push(data[index]);
            });
            result.push({
                group: updatedGroup,
                number,
            });
        });
        return { err: null, result };
    } catch (err) {
        return { err, result: null };
    }
}
