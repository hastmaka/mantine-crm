export const lastUpdate = (lastUpdateTimeString) => {
    const lastUpdateTime = new Date(lastUpdateTimeString);
    const currentTime = new Date();

    const timeDifference = currentTime - lastUpdateTime;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}
