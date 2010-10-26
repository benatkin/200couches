Hello =
  layout:
    scripts:
      "jquery.js":     "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"
      "underscore.js": true
      "backbone.js":   true
  files:
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

      this.download(files, remaining.slice(1))

    start: () ->
      this.url = require('url')

      files = this.root.files
      remaining = []
      for file, url of files
        remaining.push(file)
      this.download(this.root.files, remaining)

  init: () ->
    this.Starter.root = this.Starter.parent = this
    this.Starter.start()

Hello.init()
