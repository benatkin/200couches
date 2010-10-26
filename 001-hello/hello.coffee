Hello =
  layout:
    scripts:
      "jquery.js":     "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"
      "underscore.js": true
      "backbone.js":   true
  files:
    "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js"
    "backbone-min.js":   "http://documentcloud.github.com/backbone/backbone-min.js"
  Pusher:
    download: (files, remaining) ->
      if remaining.length == 0
        return
      
      file = remaining[0]
      console.log("Downloading #{file}")
      this.download(files, remaining.slice(1))

    push: () ->
      files = this.root.files
      remaining = []
      for file, url of files
        remaining.push(file)
      this.download(this.root.files, remaining)

  init: () ->
    this.Pusher.root = this.Pusher.parent = this
    this.Pusher.push()

Hello.init()
