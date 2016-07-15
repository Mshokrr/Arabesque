$('document').ready(function(){
	$('div#galleryBackBtn').hide();
	$('div.gallery-content').hide();
});

$('div#galleryLink1').click(function(){
	$('h2.gallery-heading').text('gallery1');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('div#galleryLink2').click(function(){
	$('h2.gallery-heading').text('gallery2');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('div#galleryLink3').click(function(){
	$('h2.gallery-heading').text('gallery3');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('div#galleryLink4').click(function(){
	$('h2.gallery-heading').text('gallery4');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('div#galleryLink5').click(function(){
	$('h2.gallery-heading').text('gallery5');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('div#galleryLink6').click(function(){
	$('h2.gallery-heading').text('gallery6');
	$('div#gallery1').show();
	$('div#galleryBackBtn').show();
	$('div#mainGallery').hide();
});

$('btn#galleryBackBtn').click(function(){
	$('h2.gallery-heading').text('Gallery');
	$('div.gallery-content').hide();
	$('div#galleryBackBtn').hide();
	$('div#mainGallery').show();
});