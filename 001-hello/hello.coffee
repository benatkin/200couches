Hello =
  layout:
    scripts:
      "jquery.js":     "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"
      "underscore.js": true
      "backbone.js":   true
  attachments:
    "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js"
    "backbone-min.js":   "http://documentcloud.github.com/backbone/backbone-min.js"
  Starter:
    doc:
      """
      Starter downloads some needed files and initializes and starts Pusher.
      """
    download: (files, remaining) ->
      if remaining.length == 0
        return
      
      file = remaining[0]
      url = this.url.parse(files[file])
      console.log("Downloading #{url.pathname} from #{url.hostname}")

      chunks = []
      self = this

      server = this.http.createClient(url.port or 80, url.hostname)
      request = server.request('GET', url.pathname, {'host': url.hostname})
      request.end()
      request.on 'response', (response) ->
        response.setEncoding 'utf8'
        response.on 'data', (chunk) ->
          chunks.push(chunk)
        response.on 'end', () ->
          self.fs.writeFileSync file, chunks.join('')
          self.download(files, remaining.slice(1))

    start: () ->
      this.url  = require('url')
      this.http = require('http')
      this.fs   = require('fs')

      files = this.root.attachments
      remaining = []
      for file, url of files
        remaining.push(file)
      this.download(files, remaining)

  init: () ->
    this.Starter.root = this.Starter.parent = this
    this.Starter.start()

Hello.init()
