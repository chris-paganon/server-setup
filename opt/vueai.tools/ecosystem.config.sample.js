module.exports = {
  apps: [
    {
      name: 'VueAI.tools',
      port: '3002',
      exec_mode: 'cluster',
      instances: 'max',
      script: './html/.output/server/index.mjs',
      env: {
        "NUXT_OPENAI_ORGANIZATION": "org-ab12",
        "NUXT_OPENAI_API_KEY": "sk-cd34"
      }
    }
  ]
}