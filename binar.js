$(function(){
	$('.button').each(function() {
			$(this).append('0');
	}) //заполняем кнопки значениями

	$('#resultContainer').append(' = 0'); //устанавливаем результат = 0;

	var c=0;

	var buttonValue = '';

	var aim = undefined;

	$('.button').on('click',function() {
		if (aim != undefined) {
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
			} //изменяем значения (0->1 || 1->0) по клику

			$('.button').each(function() {
				if ($(this).hasClass('zero')) {
					buttonValue+='0';
				} else {
					buttonValue+='1';
				}
			}) //составляем строку из значений класса "button"

			var intValue = parseInt(buttonValue, 2); //переводим строку в десятичное число
			$('#resultContainer').append(' = '+intValue);

			if (intValue==aim) {
				alert('Верно!');
				c=1;		
				var str = buttonValue;
				str = str<<0;
				$('#scoresContainer').append('Цель: '+aim+'; Результат: '+str+'; Время: '
					+minutes+':'+(seconds-1)+'</br>');
				aim = undefined;
			} // проверяем на победу и выполняем соответствующие действия

			buttonValue = '';// стираем строку
		} else {
			alert('Начните игру!');
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
			$(this).removeClass('ane');
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
		var aimDif = document.getElementsByName('difficulty');
		for (var i=0; i<aimDif.length; i++) {
			if (aimDif[i].checked) {
				var value = aimDif[i].value;
			}
		}

		switch (value) {
			case "0":
				aim = Math.round(Math.random() * (99 - 1) + 1);
				newGame(aim);
				break;
			case "1":
				aim = Math.round(Math.random() * (511 - 100) + 100);
				newGame(aim);
				break;
			case "2":
				aim = Math.round(Math.random() * (1023 - 512) + 512);
				newGame(aim);
				break;
			default:
				alert('Выберите уровень сложности!');
				break;
		} //начинаем новую игру в зависимости от уровня сложности
	}) //функция для клика по кнопке "начать"
})