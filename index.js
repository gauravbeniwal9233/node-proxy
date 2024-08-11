const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration for API
app.use('/api', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': '', // If your server doesn't need this, you can remove it.
    },
    onProxyReq(proxyReq, req, res) {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}`);
    },
    onError(err, req, res) {
        console.error('Error during proxying:', err);
        res.status(500).send('Proxy error occurred');
    },
}));

// Proxy configuration for images
app.use('/images', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/images': '',
    },
    onProxyReq(proxyReq, req, res) {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}`);
    },
    onError(err, req, res) {
        console.error('Error during proxying:', err);
        res.status(500).send('Proxy error occurred');
    },
}));

// Proxy configuration for users images
app.use('/users', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/users': '',
    },
    onProxyReq(proxyReq, req, res) {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}`);
    },
    onError(err, req, res) {
        console.error('Error during proxying:', err);
        res.status(500).send('Proxy error occurred');
    },
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
