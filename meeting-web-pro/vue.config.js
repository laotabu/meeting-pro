module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        proxy: {
            '/socket.io': {
                target: 'http://127.0.0.1',
                ws: true,
                changeOrigin: true
            }
        }
    }
}