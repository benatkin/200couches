Hello =
  attachments:
    "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js"
    "backbone-min.js":   "http://documentcloud.github.com/backbone/backbone-min.js"

  init: () ->
    this.Starter.root = this.Starter.parent = this
    this.Starter.start()

  layout:
    scripts:
      "jquery.js":     "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"
      "underscore.js": "_attachments/underscore-min.js"
      "backbone.js":   "_attachments/backbone-min.js"

  requires:
    _order:     ['underscore', 'backbone']
    backbone:   './_attachments/backbone-min.js'
    fs:         true
    http:       true
    underscore: './_attachments/underscore-min.js'
    url:        true

  Starter:
    doc:
      """
      Starter downloads some needed files and initializes and starts Pusher.
      """

    activate: () ->
      Backbone = this.lib.backbone
      this.root.Starter = Backbone.Model.extend(this)

    download: (files, remaining) ->
      if remaining.length == 0
        this.require()
        this.activate()
        return new this.root.Starter()
      
      file = remaining[0]
      filepath = '_attachments/' + file
      url = this.lib.url.parse(files[file])
      console.log("Downloading #{url.pathname} from #{url.hostname}")

      chunks = []
      self = this

      server = this.lib.http.createClient(url.port or 80, url.hostname)
      request = server.request('GET', url.pathname, {'host': url.hostname})
      request.end()
      request.on 'response', (response) ->
        response.setEncoding 'utf8'
        response.on 'data', (chunk) ->
          chunks.push(chunk)
        response.on 'end', () ->
          self.lib.fs.writeFileSync filepath, chunks.join('')
          self.download(files, remaining.slice(1))

    initialize: () ->
      console.log "Hello from Backbone.js!"

    mkdir: () ->
      dir = './_attachments'
      stat = this.lib.fs.statSync('.')
      try
        this.lib.fs.mkdirSync(dir, stat.mode)
      catch error
        null

    require: () ->
      if this.lib.fs == true
        this.lib.fs = require('fs')

      for key in this.lib._order
        value = this.lib[key]
        if value == true
          this.lib[key] = require(key)
        else if value.substring
          try
            if this.lib.fs.statSync(value).isFile()
              this.lib[key] = require(value)
          catch error
            null

      for key, value of this.lib
        # require installed libraries first
        if value == true
          this.lib[key] = require(key)

      for key, value of this.lib
        # now require files
        if value.substring
          try
            if this.lib.fs.statSync(value).isFile()
              this.lib[key] = require(value)
          catch error
            null

    start: () ->
      this.lib = {}
      for key, value of this.root.requires
        this.lib[key] = value
      this.require()

      files = this.root.attachments
      remaining = []
      for file, url of files
        remaining.push(file)
      this.mkdir()
      this.download(files, remaining)

Hello.init()
