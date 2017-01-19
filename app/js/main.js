window.onload = () => MainFunc();

function MainFunc() {
    const config = {
        newsUrl: 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=94d2597308124d9aa8d8c2ef9abf27a3',
        newsElementId: 'articles'
    };
    const app = new NewsApp(config);
    app.run();
}