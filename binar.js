$(function(){
	$('.button').each(function() {
			$(this).append('0');
	}) //заполняем кнопки значениями

	$('#resultContainer').append(' = 0'); //устанавливаем результат = 0;

	var c=0;
	var buttonValue = '';
	var level = 1;
	var timeLimit = 9;
	var aim = undefined;
	var endGame = 0;
	var clickedOnce = 1;
	var leveler = 1;

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
				clickedOnce = 1;
				if ((minutes*60+seconds-1)<timeLimit) {
					alert('Верно!');
					level++;
					timeLimit = 2*level+1-(level/2-1)*2;
					if (level<5) {
						timeLimit = timeLimit*3;
					} else if (level<10) {
						timeLimit = timeLimit*2;
						if (timeLimit>=20) {
							timeLimit = timeLimit-5;
						}
					} else if (timeLimit>=20) {
						timeLimit = timeLimit-5;
					} else if (timeLimit>30) {
						timeLimit = timeLimit-15;
					}
					
					$('#levelContainer').html('');
					$('#levelContainer').append('Уровень: '+level+' (Ограничение: '+timeLimit+' сек.)')
				} else {
					alert('Слишком медленно!')
				}

				if (level==5) {
					alert('Разминка закончена!');
					leveler = 3;
				} else if (level==10) {
					alert('Теперь начинается настоящая игра!');
					leveler = 6;
				}

				c=1;		
				var str = buttonValue;
				str = str<<0;
				$('#scoresContainer').append('</br> Уровень: '+(level-1)+'; Цель: '+aim+'; Результат: '+str+'; Время: '
					+minutes+':'+(seconds-1));
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
		var minVal = 2*2*level-3;
		var maxVal = level*minVal;

		if (maxVal>1023) {
			alert('Поздравляем! Вы прошли последний уровень!');
			endGame = 1;
		}

		if ((endGame != 1)&&clickedOnce==1) {
			aim = Math.round(Math.random() * (maxVal - minVal) + leveler*minVal);
			newGame(aim);
			clickedOnce = 0;
		}
	}) //функция для клика по кнопке "начать"
})