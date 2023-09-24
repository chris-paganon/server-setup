module.exports = {
  apps: [
    {
      name: 'VueAI.tools',
      port: '3002',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}