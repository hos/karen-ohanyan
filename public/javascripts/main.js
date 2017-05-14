/* global $ */

 $(function () {
   $('.menu').fadeIn(0)
   matchAndMarkSelectedAlbum()
 })

 function matchAndMarkSelectedAlbum () {
   var startYear = window.location.href.match(/20\d{2}/)
   var selectedLink = $('a[href*="' + startYear + '"]')
   selectedLink.addClass('selected')
 }
