$(function(){
	$('.button').each(function() {
			$(this).append('0');
	}) //заполняем кнопки значениями

	$('#resultContainer').append(' = 0'); //устанавливаем результат = 0;

	var c=0;
	var buttonValue = '';
	var aim = undefined;
	var clickedOnce = 1;

	$('.button').on('click',function() {
		if (aim != undefined) {
			$('#resultContainer').html('');
			if ($(this).hasClass('zero')) {
				$(this).addClass('ane');
				$(this).removeClass('zero');
				$(this).html('');
				$(this).append('1');
			} else if ($(this).hasClass('ane')) {
				$(this).addClass('two');
				$(this).removeClass('ane');
				$(this).html('');
				$(this).append('2');
			} else if ($(this).hasClass('two')) {
				$(this).addClass('three');
				$(this).removeClass('two');
				$(this).html('');
				$(this).append('3');
			} else if ($(this).hasClass('three')) {
				$(this).addClass('four');
				$(this).removeClass('three');
				$(this).html('');
				$(this).append('4');
			} else if ($(this).hasClass('four')) {
				$(this).addClass('five');
				$(this).removeClass('four');
				$(this).html('');
				$(this).append('5');
			} else if ($(this).hasClass('five')) {
				$(this).addClass('six');
				$(this).removeClass('five');
				$(this).html('');
				$(this).append('6');
			} else if ($(this).hasClass('six')) {
				$(this).addClass('seven');
				$(this).removeClass('six');
				$(this).html('');
				$(this).append('7');
			} else if ($(this).hasClass('seven')) {
				$(this).addClass('zero');
				$(this).removeClass('seven');
				$(this).html('');
				$(this).append('0');
			}

			var buttonValue = '';

			$('.button').each(function() {
				if ($(this).hasClass('zero')) {
					buttonValue+='0';
				} else if ($(this).hasClass('ane')) {
					buttonValue+='1';
				} else if ($(this).hasClass('two')) {
					buttonValue+='2';
				} else if ($(this).hasClass('three')) {
					buttonValue+='3';
				} else if ($(this).hasClass('four')) {
					buttonValue+='4';
				} else if ($(this).hasClass('five')) {
					buttonValue+='5';
				} else if ($(this).hasClass('six')) {
					buttonValue+='6';
				} else if ($(this).hasClass('seven')) {
					buttonValue+='7';
				}
			}) //составляем строку из значений класса "button"

			var intValue = parseInt(buttonValue, 8); //переводим строку в десятичное число
			$('#resultContainer').append(' = '+intValue);

			if (intValue==aim) {
				clickedOnce = 1;
				alert('Верно!');
				c=1;		
				aim = undefined;
			} // проверяем на победу и выполняем соответствующие действия	
		}		
	}) //функция на клики по классу "button"

	var seconds=0;
	var minutes=0;
	function timer () {
		if (c!=1) {
			$('#minutesContainer').html('');
			$('#minutesContainer').append(minutes+':');
			$('#secondsContainer').html('');
			$('#secondsContainer').append(seconds);
			seconds++;
			if (seconds==60) {
				seconds=0;
				minutes++
			};
			setTimeout(timer, 1000);
		}
	}; //функция для таймера

	function newGame (aim) {
		$('.button').each(function() {
			$(this).removeClass();
			$(this).addClass('button');
			$(this).addClass('zero');
			$(this).html('');
			$(this).append('0');
		});
		c=0;
		seconds=0;
		minutes=0;
		$('#aimContainer').html('');
		$('#aimContainer').append('Цель = '+aim);
		$('#resultContainer').html('');
		$('#resultContainer').append(' = 0')
		timer();
	}; //функция для начала новой игры

	$('#startContainer').on('click',function() {
		var minVal = 1;
		var maxVal = 4095;

		if (clickedOnce==1) {
			clickedOnce = 0;	
			aim = Math.round(Math.random() * (maxVal - minVal) + minVal);
			newGame(aim);
		}
	}) //функция для клика по кнопке "начать"
})