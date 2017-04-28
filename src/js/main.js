$(function() {
// page scroll animation

	$("#header-menu").on("click","a", function (event) {
		
		var id = $(this).attr('href');
		
		if ( id.match(/#\w/g) ){
			event.preventDefault();
			var top = $(id).offset().top;
		}

		$('body,html').animate({scrollTop: top}, 1500);
	});



	
});