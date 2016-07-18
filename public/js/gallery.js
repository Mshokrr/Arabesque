$('document').ready(function(){
	$('div#galleryBackBtn').hide();
	$('div.gallery-content').hide();
});

$('div#galleryLink1').click(function(){
	$('h2.gallery-heading').text('Gallery 1');
	$('div#gallery1').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('div#galleryLink2').click(function(){
	$('h2.gallery-heading').text('Gallery 2');
	$('div#gallery2').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('div#galleryLink3').click(function(){
	$('h2.gallery-heading').text('Gallery 3');
	$('div#gallery3').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('div#galleryLink4').click(function(){
	$('h2.gallery-heading').text('Gallery 4');
	$('div#gallery4').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('div#galleryLink5').click(function(){
	$('h2.gallery-heading').text('Gallery 5');
	$('div#gallery5').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('div#galleryLink6').click(function(){
	$('h2.gallery-heading').text('Gallery 6');
	$('div#gallery6').fadeIn();
	$('div#galleryBackBtn').fadeIn();
	$('div#mainGallery').hide();
});

$('btn#galleryBackBtn').click(function(){
	$('h2.gallery-heading').text('Gallery');
	$('div.gallery-content').hide();
	$('div#galleryBackBtn').hide();
	$('div#mainGallery').fadeIn();
});
