$(function(){
	$('.button').each(function() {
		if ($(this).hasClass('zero')) {
			$(this).append('0');
		} else {
			$(this).append('1');
		}
	})
})

$(function(){
	var buttonValue = '';
	$('.button').on('click',function() {
		$('#resultContainer').html('');
		if ($(this).hasClass('zero')) {
			$(this).addClass('ane');
			$(this).removeClass('zero');
			$(this).html('');
			$(this).append('1');
		} else {
			$(this).addClass('zero');
			$(this).removeClass('ane');
			$(this).html('');
			$(this).append('0');
		}

		$('.button').each(function() {
			if ($(this).hasClass('zero')) {
				buttonValue+='0';
			} else {
				buttonValue+='1';
			}
		})

		var intValue = parseInt(buttonValue, 2);
		$('#resultContainer').append(' = '+intValue);

		buttonValue = '';
	})
});