const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'abc3d6addea3e7748f12c20b439ca918',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;