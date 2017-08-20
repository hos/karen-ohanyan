 window.onload = function () {
   document.querySelector('.menu').style.visibility = 'visible'
   matchAndMarkSelectedPage()
   document.querySelector('.hamburger').click(function () {
     document.querySelector('nav').classList.toggle('show-menu')
   })
   var menuItems = [].slice.call(document.querySelectorAll('#works-submenu a'))
   menuItems.forEach(function (menuItem) {
     menuItem.addEventListener('click', function (event) {
       var grandFatherNode = event.target.parentNode.parentNode
       if (!grandFatherNode.classList.contains('submenu')) {
         document.getElementById('works-submenu').classList.toggle('hidden')
       }
     })
   })
   document.getElementsByTagName('body')[0].addEventListener('keydown', function (event) {
     if (event.keyCode === 37) return previousImage()
     if (event.keyCode === 39) return nextImage()
   })
 }

 function nextImage () {
   var currentImage = getCurrentImage()
   var indexOfNext = window.albumImages.indexOf(currentImage) + 1
   if (!window.albumImages[indexOfNext]) {
     indexOfNext = 0
   }
   var nextImage = window.albumImages[indexOfNext]
   var newLink = window.location.href.replace(currentImage.fileName.replace('.jpg', ''), nextImage.fileName.replace('.jpg', ''))
   window.location.replace(newLink)
 }

 function previousImage () {
   var currentImage = getCurrentImage()
   var indexOfPrevious = window.albumImages.indexOf(currentImage) - 1
   if (!window.albumImages[indexOfPrevious]) {
     indexOfPrevious = (window.albumImages.length - 1)
   }
   var prevImage = window.albumImages[indexOfPrevious]
   var newLink = window.location.href.replace(currentImage.fileName.replace('.jpg', ''), prevImage.fileName.replace('.jpg', ''))
   window.location.replace(newLink)
 }

 function matchAndMarkSelectedPage () {
   var links = [].slice.call(document.querySelectorAll('.parent-menu a[href]')).reverse()
   var currentItem = links.find(function (a) {
     var currentHref = a.href.replace(/^[a-z]{4}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/, '$1')
     currentHref = currentHref.match(/20\d{2}/) || currentHref
     return window.location.href.indexOf(currentHref) !== -1
   })
   if (!currentItem.classList.contains('work')) {
     var menu = document.getElementById('works-submenu')
     menu.classList.toggle('hidden')
   }
   return (currentItem || links.reverse().shift()).classList.add('selected')
 }

 function getCurrentImage () {
   var link = document.querySelector('.image-container img').src
   return window.albumImages.find(img => link.indexOf(img.fileName) > -1)
 }
