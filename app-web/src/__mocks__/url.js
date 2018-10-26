jest.requireActual('url');

const url = {
    resolve: () => arguments.join(''),
    URL: function URL(url) {
        this.url = url;
        this.href = url;
        this.toString = () => url;
    },
};

url.URL.prototype.searchParams = {
    set: jest.fn(),
};

module.exports = url;
