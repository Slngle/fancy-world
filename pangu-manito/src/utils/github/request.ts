import superagent from 'superagent'

export function requestGet(url): Promise<any> {
  return new Promise(resolve => {
    superagent
      .get(`https://api.github.com${url}`)
      .set('encoding', 'utf-8')
      .set('User-Agent', 'pangu-npm')
      .set('Accept', 'application/vnd.github.v3+json')
      .end(function(err, res) {
        const body = res && res.body
        if (err || !body) {
          resolve(null)
        } else {
          resolve(body)
        }
      })
  })
}
