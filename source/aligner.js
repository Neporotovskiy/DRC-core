export function aligner(array) {
    try {
        const result = [];
        array.forEach(({ length, number }, index) => {
            for (let i = 0; i < number; i++) {
                result.push({ index, length });
            }
        });
        result.sort((previous, current) => current.length - previous.length);
        return { err: null, result };
    } catch (err) {
        return { err, result: null };
    }
}
