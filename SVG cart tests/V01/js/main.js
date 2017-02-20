
var itemCount = 0;


$('.add-to-cart').on('click', function(){
	if (itemCount == 0) {
		itemCount++;
		$('.item-counter').text(itemCount);
	 	$('.bag-btn').addClass('menu-open-button-trans');
	 	$('.item-counter').addClass('item-counter-trans');
 	}
 	else {
 		itemCount++;
 		// setTimeout("$('.item-counter').removeClass('item-counter-trans')", 3000);
 		$('.item-counter').removeClass('item-counter-trans');
 		$('.item-counter').addClass('item-counter-trans-scale');
		setTimeout("$('.item-counter').text(itemCount)", 300);
		setTimeout("$('.item-counter').removeClass('item-counter-trans-scale')", 300);
		setTimeout("$('.item-counter').addClass('item-counter-trans');", 600);
 	}
});


$('.reset').on('click', function(){
location.reload();
});
