import axios from 'axios'
import download from 'download'
import logger from '@rea-scripts/util/logger'
import spinner from '@rea-scripts/util/spinner'

const GITHUB_API = 'https://api.github.com'
const PUBLIC_TOKEN = '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'

const githubRequest = axios.create({
  baseURL: GITHUB_API,
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 获取最后一次commit
 *
 * @export
 * @return {*}
 */
export async function getLastCommit() {
  spinner.start('正在检测模板更新')
  return githubRequest('/repos/xzd-cli/pf-cli-template/commits', {
    headers: { Authorization: PUBLIC_TOKEN },
  })
    .then((res) => {
      spinner.clear()
      const commits = res.data || []
      return commits && commits.length ? commits[0].sha : ''
    })
    .catch(() => {
      spinner.clear()
    })
}

/**
 * 下载模板文件
 *
 * @export
 * @return {*}
 */
export async function getGitlabRepository(homeDir) {
  spinner.start('正在从远端拉取模板')
  return download('https://github.com/xzd-cli/pf-cli-template/archive/refs/heads/main.zip', homeDir, {
    extract: true,
    retries: 0,
    timeout: 25000,
  })
    .then((repository) => {
      spinner.clear()
      logger.success('模板拉取成功')
      return repository
    })
    .catch(() => {
      spinner.clear()
      console.error('模板拉取失败')
      process.exit(0)
    })
}

/**
 * 获取模板列表
 *
 * @export
 * @return {*}
 */
export async function getTemplateList() {
  spinner.start('正在获取模板列表')
  return axios('https://raw.githubusercontent.com/xzd-cli/pf-cli-template/main/pf-cli.json')
    .then((res) => {
      spinner.clear()
      return res.data || []
    })
    .catch(() => {
      spinner.clear()
      console.error('获取模板列表失败')
      process.exit(0)
    })
}
