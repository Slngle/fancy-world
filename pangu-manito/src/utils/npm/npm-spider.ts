import cheerio from 'cheerio'
import request from 'superagent'
import { async } from 'rxjs/internal/scheduler/async'

export function getNpmProjectAndMessage(host, userName, organization): Promise<any> {
  return new Promise<any>(resolve => {
    host = host.replace(/\/&/, '')
    request
      .get(`${host}/~${userName}`)
      .set('encoding', 'utf-8')
      .end(function(err, resp) {
        const html = resp.text
        const $ = cheerio.load(html) //采用cheerio模块解析html
        const group: Array<any> = []
        $('.ef4d7c63 .flex h3').each(function(index, item) {
          const re = new RegExp(`@${organization}`) // /@[^/]+/
          //@ts-ignore
          const title = $(this)
            .text()
            .trim()
          if (re.test(title)) {
            group.push({
              title
            })
          }
        })
        resolve(group)
      })
  })
}
