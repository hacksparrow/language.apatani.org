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

  // dictionary highlighter
  var temp = document.location.href.split('/')
  var section = temp[3]
  if (section == 'dictionary') {
    var page = temp[4]
    var selectorHref = '/dictionary/' + page
    var selectorIndex = '#dictionary-link a[href="' + selectorHref + '"]'
    $(selectorIndex).css('fontWeight', 'bold')
  }

})
