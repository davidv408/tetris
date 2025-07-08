export async function wait(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, timeMs);
    });
}