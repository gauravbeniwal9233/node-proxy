const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration for API
app.use('/api', createProxyMiddleware({
    target: 'http://sahosoftweb.com', // Target server
    changeOrigin: true,
    secure: false, // This allows serving content over HTTPS even if the target is HTTP
    pathRewrite: {
        '^/api': '/api', // Keeps the /api path when forwarding the request
    },
}));

// Proxy configuration for images
app.use('/images', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/images': '/images',
    },
}));

// Proxy configuration for users images
app.use('/users', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/users': '/users',
    },
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
