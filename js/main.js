$(document).ready(function () {

  var voiceGender = 'm' // set 'f' for female voice

  // play audio
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

})
