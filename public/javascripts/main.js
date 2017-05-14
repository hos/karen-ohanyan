/* global $,  */

 $(function () {
   $('.menu').fadeIn(0)
   matchAndMarkSelectedPage()
   $('.hamburger').click(function () {
     $('.hamburger').toggleClass('show-menu')
   })
 })

 window.nextImage = nextImage
 window.previousImage = previousImage

 function nextImage () {
   var currentImage = getCurrentImage()
   var indexOfNext = window.albumImages.indexOf(currentImage) + 1
   if (!window.albumImages[indexOfNext]) indexOfNext = 0
   var nextImage = window.albumImages[indexOfNext]
   var newLink = window.location.href.replace(currentImage.fileName.replace('.jpg', ''), nextImage.fileName.replace('.jpg', ''))
   window.location.replace(newLink)
 }

 function previousImage () {
   var currentImage = getCurrentImage()
   var indexOfPrevious = window.albumImages.indexOf(currentImage) - 1
   if (!window.albumImages[indexOfPrevious]) indexOfPrevious = (window.albumImages.length - 1)
   var prevImage = window.albumImages[indexOfPrevious]
   var newLink = window.location.href.replace(currentImage.fileName.replace('.jpg', ''), prevImage.fileName.replace('.jpg', ''))
   window.location.replace(newLink)
 }

 function matchAndMarkSelectedPage () {
   var links = $('.parent-menu a[href]').toArray().reverse()
   var currentItem = links.find(function (a) {
     var href = $(a).attr('href').replace(window.location.hostname)
     href = href.match(/20\d{2}/) || href
     return window.location.href.indexOf(href) !== -1
   })
   return $(currentItem || $('nav a')[0]).addClass('selected')
 }

 function getCurrentImage () {
   var link = $('.image-container img').attr('src')
   return window.albumImages.find(img => link.indexOf(img.fileName) > -1)
 }
