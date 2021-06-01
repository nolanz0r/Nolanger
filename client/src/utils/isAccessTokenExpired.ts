export const isAccessTokenExpired = (token: number) => {
    const accessTokenExpDate = token - 10;
    const currentTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= currentTime;
};