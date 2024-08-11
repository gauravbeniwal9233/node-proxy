const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace this with your actual token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjExNTUiLCJuYmYiOjE3MjMwOTU1MjcsImV4cCI6MTcyMzcwMDMyNywiaWF0IjoxNzIzMDk1NTI3fQ.3qAWIRTxCafwDduU-aeynX_vnzDdDr4FsIE1-Ql-xW8';

// Proxy configuration for API
app.use('/api', createProxyMiddleware({
    target: 'http://sahosoftweb.com',
    changeOrigin: true,
    secure: false,
    onProxyReq(proxyReq, req, res) {
        // Add the authorization header to the proxied request
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path} with token: ${token}`);
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
        '^/images': '/images',
    },
    onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path} with token: ${token}`);
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
        '^/users': '/users',
    },
    onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path} with token: ${token}`);
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
