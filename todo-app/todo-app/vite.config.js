import { defineConfig, createServer as createViteServer } from 'vite'
import express from 'express'
import vue from '@vitejs/plugin-vue'
const path = require('path');
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');

const app = express()

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, '..', 'data'),
  proxy: {
    '/api': {
      hub: 'sample',
    },
  },
  showBoard: true,
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
});


datahubMiddleware(app)(datahubConfig);
defaultDatahub.startServer(datahubConfig).then(() => { console.log('datahub ready'); });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
  
})
