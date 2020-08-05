const path = require('path')
const spawn = require('cross-spawn')
const root = require('find-yarn-workspace-root')()
const { getPaths, edit } = require('@rescripts/utilities')

const rawOutput = spawn.sync('yarn', ['--json', 'workspaces', 'info'])
const output = JSON.parse(rawOutput.output[1].toString())
const packages = JSON.parse(output.data)

const include = Object.values(packages).map(p => path.join(root, p.location))
const exclude = /node_modules/

module.exports = config => {
  const nodeModules = 'node_modules'
  const packageModules = config.resolve.modules.filter(p => p !== nodeModules)
  // Favor the original package's node_modules first to avoid package duplication
  // See https://medium.com/rewire-to/webpack-module-resolution-within-a-monorepo-or-how-i-stopped-bundling-two-versions-of-react-7c1d8c31d5a0
  config.resolve.modules = packageModules.concat(
    path.join(root, nodeModules),
    nodeModules,
  )

  const babelLoaderPaths = getPaths(
    // Only use babel-loader instance with explicit includes
    p => p && p.loader && p.loader.includes('babel-loader') && !!p.include,
    config
  )

  return edit(
    loader => ({
      ...loader,
      include: include.concat(loader.include),
      exclude: loader.exclude ? [exclude].concat(loader.exclude) : exclude,
    }),
    babelLoaderPaths,
    config
  )
}
