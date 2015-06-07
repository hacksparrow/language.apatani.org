$(document).ready(function () {

  var voiceGender = 'm' // set 'f' for female voice

  // play alphabet audio
  $('td:first-child').click(function () {

    var td = this
    var letter = $(this).text().split(' ').slice(-1)[0]

    if (letter == '-ñ') {
      letter = 'ñ'
    }

    if (letter == "‘") {
      letter = 'gstop' // having to use this name instead of ', because URL encoding meesing up the filename
    }

    var soundPath = '/sounds/letters/'+ voiceGender +'/'+ letter +'.mp3'

    var sound = soundManager.createSound({
      url: soundPath,
      autoLoad: true,
      onload: function () {
        $(td).find('i').removeClass('fa-volume-off').addClass('fa-volume-up')
      },
      onfinish: function() {
        $(td).find('i').removeClass('fa-volume-up').addClass('fa-volume-off')
      }
    })

    sound.play()

  })

  // dictionary highlighter
  var temp = document.location.href.split('/')
  var section = temp[3]
  if (section == 'dictionary') {
    var page = temp[4]
    var selectorHref = '/dictionary/' + page
    var selectorIndex = '#dictionary-link a[href="' + selectorHref + '"]'
    $(selectorIndex).css('fontWeight', 'bold')
  }

  // add sound to the dictionary entries
  $('.dictionary-content p strong').each(function (i, el) {

    var letter = document.title.split(' ').splice(-1)[0].toLowerCase()
    var word = $(el).text().trim()
    word = word.replace(/’/g, "'") // convert to proper apostrophe
    word = word.replace(/\u300/g, '\u1E81')

    var soundPath = '/sounds/words/'+ letter + '/'+ voiceGender + '/' + word + '.mp3'
    
    var player = '<i class="fa fa-volume-off volume playable"></i>'
    $(el).prepend(player)

    $(el).find('i').click(function () {

      var self = this
      var sound = soundManager.createSound({
        url: soundPath,
        autoLoad: true,
        onload: function (success) {
          if (success) {
            $(self).removeClass('fa-volume-off').addClass('fa-volume-up')
          }
          else {
            $(self).removeClass('fa-volume-up').addClass('fa-volume-off')
            $(self).removeClass('playable').addClass('non-playable')
            $(self).css('color', 'gray')
          }
        },
        onfinish: function() {
          $(self).removeClass('fa-volume-up').addClass('fa-volume-off')
        }
      })

      sound.play()

    })

  })

})
