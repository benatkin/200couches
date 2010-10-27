Hello =
  attachments:
    "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js"
    "backbone-min.js":   "http://documentcloud.github.com/backbone/backbone-min.js"

  layout:
    scripts:
      "jquery.js":     "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"
      "underscore.js": "_attachments/underscore-min.js"
      "backbone.js":   "_attachments/backbone-min.js"

  init: () ->
    this.Starter.root = this.Starter.parent = this
    this.Starter.start()

  requires:
    "backbone": true

  Starter:
    doc:
      """
      Starter downloads some needed files and initializes and starts Pusher.
      """

    activate: () ->
      this.root.requires.underscore = require('./underscore-min.js')
      this.root.requires.backbone   = require('./backbone-min.js')
      Backbone = this.root.requires.backbone
      this.root.Starter = Backbone.Model.extend(this)

    download: (files, remaining) ->
      if remaining.length == 0
        this.activate()
        return new this.root.Starter()
      
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

    initialize: () ->
      console.log "Hello from Backbone.js!"

    start: () ->
      this.url  = require('url')
      this.http = require('http')
      this.fs   = require('fs')

      files = this.root.attachments
      remaining = []
      for file, url of files
        remaining.push(file)
      this.download(files, remaining)

Hello.init()
