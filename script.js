const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

let score = 0; // amoun of right answers
let questionIndex = 0; // current question

const header = document.querySelector('#header');
const list = document.querySelector('#list');
const btn = document.querySelector('#submit');

clearPage();
showQuestion();

btn.onclick = checkAnswer;

function clearPage() {
	header.innerHTML = '';
	list.innerHTML = '';
}

function showQuestion() {

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace("%title%", questions[questionIndex].question);
	header.innerHTML = title;

	const listTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer"/>
				<span>%answer%</span>
			</label>
		</li>`;

	for ( let [index, item] of questions[questionIndex].answers.entries()) {
		let answer = listTemplate.replace("%answer%", item)
														 .replace("%number%", index + 1);
		list.innerHTML += answer;	
	}
}

function checkAnswer() {
	const checkedRadio = list.querySelector('input:checked');
	
	if (!checkedRadio) {
		btn.blur();
		return ;
	}

	if (parseInt(checkedRadio.value) === questions[questionIndex].correct) {
		score++;
	}

	if (questions.length - 1 !== questionIndex ) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
						<h2 class="title">%title%</h2>
						<h3 class="summary">%message%</h3>
						<p class="result">%result%</p>
	`;

	let title,message;
	let result = `${score} из ${questions.length}`; 

	if (score === questions.length) {
		title = 'Поздравляем! 🎉';
		message = 'Вы ответили верно на все вопросы! 😎👏';
	} else if ((score*100)/questions.length >= 50) {
		title = 'Неплохой результат! 😉';
		message = 'Вы дали более половины правильных ответов! 👍';
	} else {
		title = 'Стоит постараться! 🤔';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	const finalMessage = resultsTemplate.replace('%title%', title)
																		.replace('%message%', message)
																		.replace('%result%', result);
	header.innerHTML = finalMessage;

	btn.blur();
	btn.innerText = 'Начать заново';
	btn.onclick =  function() {
		history.go();
	}
}

