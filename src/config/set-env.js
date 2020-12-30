#!/usr/bin/env node
const { spawn } = require('child_process')
const setEnv = (arg) => {
  'use strict'
  const newEnv = Object.create(null)
  const script = []
  for (const envItem of arg) {
    if (envItem.includes('=')) {
      const [envKey, envValue] = envItem.split('=')
      if (envValue !== null) {
        newEnv[envKey] = envValue
      }
      continue;
    }
    script.push(envItem)
  }
  spawn(`${script.join(' ')}`, {
    stdio: 'inherit',
    env: newEnv,
    shell: process.platform === 'win32',
  })
}

setEnv(process.argv.slice(2))
