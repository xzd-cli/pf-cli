import merge from 'lodash/merge'
import commonjs from 'rollup-plugin-commonjs'
import tsPaths from 'rollup-plugin-tsconfig-paths'
import { join } from 'path'

export default function getBundleOpts(ctx) {
  const { userConfig } = ctx

  const bundleOpts = merge(
    {
      entry: 'src/index.tsx',
      esm: 'rollup',
      cjs: 'rollup',
      umd: 'rollup',
      extraRollupPlugins: [
        tsPaths({
          tsConfigPath: join(process.cwd(), 'tsconfig.json'),
        }),
        commonjs({
          include: [/node_modules/],
        }),
      ],
      injectCSS: true,
    },
    userConfig,
  )

  if (typeof bundleOpts.esm === 'string') {
    bundleOpts.esm = { type: bundleOpts.esm }
  }
  if (typeof bundleOpts.cjs === 'string') {
    bundleOpts.cjs = { type: bundleOpts.cjs }
  }
  if(typeof bundleOpts.umd === 'string') {
    bundleOpts.umd = { type: bundleOpts.umd }
  }
  /**
   *  bundleOpts 默认
   * {
        entry: 'src/index.tsx',
        esm: { type: 'rollup' },
        cjs: { type: 'rollup' },
        umd: { type: 'rollup' },
        extraRollupPlugins: [
          {
            name: 'tsconfig-paths',
            buildStart: [Function: buildStart],
            resolveId: [AsyncFunction: resolveId]
          },
          {
            name: 'commonjs',
            buildStart: [Function: buildStart],
            resolveId: [Function: resolveId],
            load: [Function: load],
            transform: [Function: transform]
          }
        ],
        injectCSS: true,
        type: 'component'
      }
   * 
  */

  return bundleOpts
}
