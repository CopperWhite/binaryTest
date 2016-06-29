$(function(){
	$('.button').each(function() {
			$(this).append('0');
	}) //заполняем кнопки значениями

	$('#resultContainer').append(' = 0'); //устанавливаем результат = 0;

	var c=0;
	var buttonValue = '';
	var level = 1;
	var timeLimit = 20;
	var aim = undefined;
	var endGame = 0;
	var clickedOnce = 1;
	var leveler = 1;
	var firstClick = 1;
	var list = Array();

	var champArray = $.cookie('champArray1');
	var champions = eval(champArray);

	if (champArray == null) {
		var champions = new Array (
			{"name":"unnamed","time":999},
			{"name":"unnamed","time":999},
			{"name":"unnamed","time":999},
			{"name":"unnamed","time":999},
			{"name":"unnamed","time":999}
		);

		champions=JSON.stringify(champions);
		$.cookie('champArray1', champions, {expires: 30});
	};

	var champArray = $.cookie('champArray1');
	var champions = eval(champArray);

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
				$(this).addClass('eight');
				$(this).removeClass('seven');
				$(this).html('');
				$(this).append('8');
			} else if ($(this).hasClass('eight')) {
				$(this).addClass('nine');
				$(this).removeClass('eight');
				$(this).html('');
				$(this).append('9');
			} else if ($(this).hasClass('nine')) {
				$(this).addClass('ten');
				$(this).removeClass('nine');
				$(this).html('');
				$(this).append('A');
			} else if ($(this).hasClass('ten')) {
				$(this).addClass('eleven');
				$(this).removeClass('ten');
				$(this).html('');
				$(this).append('B');
			} else if ($(this).hasClass('eleven')) {
				$(this).addClass('twelve');
				$(this).removeClass('eleven');
				$(this).html('');
				$(this).append('C');
			} else if ($(this).hasClass('twelve')) {
				$(this).addClass('thirteen');
				$(this).removeClass('twelve');
				$(this).html('');
				$(this).append('D');
			} else if ($(this).hasClass('thirteen')) {
				$(this).addClass('fourteen');
				$(this).removeClass('thirteen');
				$(this).html('');
				$(this).append('E');
			} else if ($(this).hasClass('fourteen')) {
				$(this).addClass('fifteen');
				$(this).removeClass('fourteen');
				$(this).html('');
				$(this).append('F');
			} else if ($(this).hasClass('fifteen')) {
				$(this).addClass('zero');
				$(this).removeClass('fifteen');
				$(this).html('');
				$(this).append('0');
			}

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
				} else if ($(this).hasClass('eight')) {
					buttonValue+='8';
				} else if ($(this).hasClass('nine')) {
					buttonValue+='9';
				} else if ($(this).hasClass('ten')) {
					buttonValue+='a';
				} else if ($(this).hasClass('eleven')) {
					buttonValue+='b';
				} else if ($(this).hasClass('twelve')) {
					buttonValue+='c';
				} else if ($(this).hasClass('thirteen')) {
					buttonValue+='d';
				} else if ($(this).hasClass('fourteen')) {
					buttonValue+='e';
				} else if ($(this).hasClass('fifteen')) {
					buttonValue+='f';
				}

			}) //составляем строку из значений класса "button"

			var intValue = parseInt(buttonValue, 16); //переводим строку в десятичное число
			$('#resultContainer').append(' = '+intValue);

			if (intValue==aim) {
				clickedOnce = 1;
				if ((minutes*60+seconds-1)<timeLimit) {
					alert('Верно!');
					level++;
					timeLimit = 2*level+1-(level/2-1)*2;
					if (level<5) {
						timeLimit = timeLimit*5;
					} else if (level<10) {
						timeLimit = timeLimit*3;
					}
					
					$('#levelContainer').html('');
					$('#levelContainer').append('Уровень: '+level+' (Ограничение: '+timeLimit+' сек.)')
				} else {
					alert('Слишком медленно!')
				}

				if (level==5) {
					alert('Разминка закончена!');
					leveler = 2;
				} else if (level==10) {
					alert('Теперь начинается настоящая игра!');
					leveler = 4;
				}

				c=1;		
				var str = buttonValue;
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

	var totalSeconds = 0;
	var totalMinutes = 0;
	function totalTimer() {
		$('#totalMinutesContainer').html('');
		$('#totalMinutesContainer').append(totalMinutes+': ');
		$('#totalSecondsContainer').html('');
		$('#totalSecondsContainer').append(totalSeconds);
		totalSeconds++;
		if (totalSeconds==60) {
			totalSeconds=0;
			totalMinutes++
		};
		setTimeout(totalTimer, 1000);
	} //функция для общего таймера

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
		
		if (firstClick == 1) {
			totalTimer();
			firstClick = 0;
		}

		var minVal = 16*level*leveler-3;
		var maxVal = 16*2*2*2*2*level;

		if ((endGame != 1)&&clickedOnce==1) {
			aim = Math.round(Math.random() * (maxVal - minVal) + 2*minVal);
			if (aim>4095||maxVal>4095||level>15) {
				alert('Поздравляем! Вы прошли последний уровень!');
				for (var i=0;i<5;i++) {
					if (champions[i].time>(totalMinutes*60+totalSeconds)) {
						alert('Вы поставили рекорд!');
						var e=4;
						while (e>i) {
							champArray = $.cookie('champArray1');
							champions = eval(champArray);
							champions[e] = champions[e-1];
							e--;
							champions=JSON.stringify(champions);
							$.cookie('champArray1',champions, {expires: 30});
						}

						champArray = $.cookie('champArray1');
						champions = eval(champArray);
						champions[i].time = (totalMinutes*60+totalSeconds);
						champions[i].name = $('#name').val();

						champions=JSON.stringify(champions);
						$.cookie('champArray1',champions, {expires: 30});


						showList();
						break;
					}
				}
				endGame = 1;
			} else {
				newGame(aim);
				clickedOnce = 0;
			}
		}
	}) //функция для клика по кнопке "начать"

	function showList() {
		champArray = $.cookie('champArray1');
		champions = eval(champArray);
		for (var i=0; i<5; i++) {
			text = '\n'+(i+1)+'. '+champions[i]['name']+' : '+ champions[i]['time']+' сек.';
			list[i] = text;
		}
		alert(list);
	} //функция вывода списка лидеров

	$('#championsContainer').on('click', function() {	
		showList();
	})

})