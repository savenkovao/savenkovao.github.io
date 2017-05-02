(function() {

// burger menu toggle
	var brgrMenu = document.getElementById("brgr-menu");
	var menu = document.getElementById("header-menu");
	var count = 0;
	
	brgrMenu.addEventListener("click", enableBrgrMenu, false);

	function enableBrgrMenu(event){
		var e = getTarget(event);

		if (e != undefined) {
			count++;
			if(count%2==0) {
				deactivateBrgrMenu();				
			} else {
				activateBrgrMenu();
			}
		}
	}

	function activateBrgrMenu(){
		menu.style.display = 'block';
		brgrMenu.classList.add('active');		
	}

	function deactivateBrgrMenu(){
		menu.style.display = '';
		brgrMenu.classList.remove('active');
		count = 0;
	}

// get clicked element
	function getTarget(event) {
		var target = event.target;
		var currentTarget = event.currentTarget;

		while (target != event.currentTarget) {

			if (target.hasAttribute('data-meta-node')) {
				var e = {target, currentTarget};
				
				return e;
			}
			target = target.parentNode;
		}
		return;
	}


// age change
	var age = document.getElementById('age');
	var year = new Date();
	var birthday = new Date(1992,09,13);
	age.innerHTML = Math.floor( (year - birthday) / (1000 * 60 * 60 * 24 * 365) );


// experience block slider
	var slider = document.getElementById('slider');
	var slInner = document.getElementById('slider__inner');
	var slides = document.querySelectorAll('.slider-item');
	var firstSlide = document.querySelectorAll('.slider-item')[0];
	var arrLeft = document.getElementById('slider-arrw-l');
	var arrRight = document.getElementById('slider-arrw-r');
	var slItemsNumber = slides.length;
	var slItemMargin = 0;
	var prevSliderWidth;

	arrLeft.addEventListener("click", browse, false);
	arrRight.addEventListener("click", browse, false);
	window.addEventListener("resize", browse, false);

	function browse() {
		var sliderWidth = slider.clientWidth;
		var browseCount = slItemsNumber - 1;

		if(this != window) {			
			var direct = this.getAttribute('data-direct');
		}

		if (direct == 'left') {				
			if(slItemMargin < 0){
				slItemMargin += sliderWidth;
				firstSlide.style.marginLeft = slItemMargin + 'px';
			}
		} else if ( direct == 'right'){
			slItemMargin -= sliderWidth;
			if (slItemMargin <= 0 && slItemMargin >= -browseCount * sliderWidth){
				firstSlide.style.marginLeft = slItemMargin + 'px';
			}
		}	else {
			// resize
			slItemMargin *= (sliderWidth / prevSliderWidth);
			firstSlide.style.marginLeft = slItemMargin + 'px';
		}

		if (slItemMargin <= -browseCount * sliderWidth){
			slItemMargin = -browseCount * sliderWidth;
		}

		prevSliderWidth = sliderWidth;
	}

// fixed navigation

	var dotNav = document.getElementById('dot-nav');
	var navButtons = document.querySelectorAll('.dot-nav__link');

	window.addEventListener('scroll', highlightNavbutton, false);
	dotNav.addEventListener('scroll', highlightNavbutton, false);
	highlightNavbutton ();
	function highlightNavbutton () {

		navButtons.forEach(function(item, i, arr) {
			item.classList.remove('active');			

			var activeBlock = document.getElementById( item.getAttribute('data-id') +'' );

			// all blocks
			if ( window.pageYOffset >= activeBlock.offsetTop && window.pageYOffset < (activeBlock.offsetTop + activeBlock.clientHeight) ) {
				item.classList.add('active');	
			}

			// last block
			if(window.pageYOffset >= (document.body.scrollHeight - document.documentElement.clientHeight - 1) && (i == arr.length-1) ) {
				arr[i-1].classList.remove('active');
				item.classList.add('active');
			} 				

		});

	}



// page scroll animation jQuery

	$("#dot-nav").on("click","a", function (event) {
		
		var id = $(this).attr('href');
		
		if ( id.match(/#\w/g) ){
			event.preventDefault();
			var top = $(id).offset().top;
		}

		$('body,html').animate({scrollTop: top}, 500);
	});

	
})();