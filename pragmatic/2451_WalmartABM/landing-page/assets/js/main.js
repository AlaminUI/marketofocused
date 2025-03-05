startedbtn= document.querySelectorAll(".chat-btn");
 counter = 0;
for(a=0; a<startedbtn.length;a++){
  startedbtn[a].addEventListener('click',function(){
counter ++;

if(counter <2){
  hbspt.forms.create({
    region: "na1",
    portalId: "23254949",
    formId: "252e43f2-700a-411a-98b6-9de963076ab2"
  });
}
  document.querySelector('.hbspt-form').classList.remove("d-none")
 document.querySelector('body').classList.add('form-active')
  
      setTimeout(function(){
     if(counter <2){
      crossdiv = document.createElement('div');
        crossdiv.className="cancleform";
        crossdiv.textContent="X";
        document.querySelector('.hbspt-form').appendChild(crossdiv) 
     }

        document.querySelector(".cancleform").addEventListener('click',function(){
  document.querySelector('.hbspt-form').classList.add("d-none")
  document.querySelector('body').classList.remove("form-active")

})
      },3000)
  })
 
}
 
// document.getElementById('videoplay').addEventListener('click',function(){
//   this.classList.add('d-none')
//   document.getElementById('video').classList.remove('d-none')
//   // document.getElementById('video').play()
//   player.play()
// })

// window.addEventListener("scroll", function(){
//   if(window.pageYOffset > 200){
//     document.getElementById('video').play()
//       }
// });

  // Get all sections that have an ID defined
  const sections = document.querySelectorAll("section[id]");
 
  // Add an event listener listening for scroll
  window.addEventListener("scroll", navHighlighter);
  
  function navHighlighter() {
    
    // Get current scroll position
    let scrollY = window.pageYOffset;
    
    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight  ;
      const sectionTop = current.offsetTop - 150;
      sectionId = current.getAttribute("id");
      
   
      if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ){
        document.querySelector(".nav-items a[href*=" + sectionId + "]").classList.add("active");
      } else {
        document.querySelector(".nav-items a[href*=" + sectionId + "]").classList.remove("active");
      }
    });
  }
  
  
  $(document).ready(function(){
      $('a[href^="#"]').on('click', function(event) {
          if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                  scrollTop: $(hash).offset().top-100
                  
              }, 200);
          }
      });
  });
  
  $(function(){
      // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();
  
    $(window).scroll(function(event){
      didScroll = true;
    });
  
    setInterval(function() { // wait for it... wait for it... wait for it
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 200);
  
    function hasScrolled() {
          var scrolltop = $(this).scrollTop();
          // Make sure they scroll more than delta
          if(Math.abs(lastScrollTop - scrolltop) <= delta)	return;
  
          // If they scrolled down and are past the navbar, add class .nav-up.
          // This is necessary so you never see what is "behind" the navbar.
          
          if (scrolltop > 120){
            // On scroll down we add nav-up
           
            $('header').addClass('header-sticky');
          
          } else {
            $('header').removeClass('header-sticky');
          }
  
          lastScrollTop = scrolltop;
    }
  });
  
  
  
   
    $('#humberger').on('click', function(event) {
    $('.nav-items').toggleClass("active")
  })
  
  
  $('.nav-items a').on("click",function(){
    $('.nav-items').removeClass("active")
  })