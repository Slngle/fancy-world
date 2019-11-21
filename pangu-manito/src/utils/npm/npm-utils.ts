export function getVersion(npmName: string): Promise<Array<any>> {
  return new Promise<Array<any>>(resolve => {
    const { exec } = require('child_process')
    exec(`npm view ${npmName} versions`, (err, stdout, stderr) => {
      if (!err) {
        const re = /'([^',]+)'/g
        if (stdout) {
          const versions: Array<any> = []
          stdout.replace(re, function($0, $1) {
            versions.push($1)
          })
          resolve(versions)
        } else {
          resolve([])
        }
      } else {
        resolve([])
      }
    })
  })
}
