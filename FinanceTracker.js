/*Make an array for all of the days in the calendar and then have the td or tr:nth-child(x) in it for each position in the calendar so you can easily just acceses the array to find a postion based on its nth day, and have a starting varible so when you have day 1 start like 3 days in because its a teusday you just add or subtract that to the array calculatitons */
//Waiting for page to load because some varibles need the content of page
var selectedDay;
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDay();
var date = today.getDate();
var firstDay = new Date(year, month, 1).getDay();
var lastDay = new Date(year, month+1, 0).getDate();
var days = [];
let z = 0;
var currentDay;
var dailyTotals = [];
var dailyExpenses = [];
var dailyIncome = [];
var dailyList = [];
var totalExpenses = 0;
var totalIncome = 0;
let w = 0;
let x = 0;
var expensesNumber = [];
var incomesNumber = [];
var change = month;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var divList = [[],[],[],[],[],[],[],[],[],[],[],[]];


document.addEventListener("DOMContentLoaded", function() {

	function updateSelectedDay(DAY) {
		if (selectedDay) {
			document.getElementById(selectedDay).style.backgroundColor = "gray";
			document.getElementById(selectedDay).style.color = "rgb(48, 97, 222)"
			const elements = document.querySelectorAll(`[data-day="${selectedDay}"]`);
			elements.forEach(function(element) {
				element.style.display = "none";
			});
		}
		
		currentElement = document.getElementById(DAY);
			currentElement.style.backgroundColor = "green";
			currentElement.style.color = "white";
		
		const newElements = document.querySelectorAll(`[data-day="${[month][DAY]}"]`);
		newElements.forEach(element => {
			element.style.display = "block";
		});
		for (i = 0; i < divList[month].length; i++) {
			if (divList[month][DAY][i]) {
				divList[month][DAY][i].style.display = "block";
			}
		}
		
		selectedDay = DAY;
		updateTotalsDisplay();
	}

	for (var m = 0; m < 12; m++) {
		dailyTotals[m] = [];
		dailyExpenses[m] = [];
		dailyIncome[m] = [];
		dailyList[m] = [];
		for (var i = 2; i < 8; i++){
			for (var y = 1; y < 8; y++) {
				//Backticks to properly interpolate the varible into the string
				if (z > 41) {
					z = 0;
				}
				days.push(Number(document.querySelector(`tr:nth-child(${i}) td:nth-child(${y})`).id = z));
				dailyTotals[m][z] = [];
				dailyExpenses[m][z] =[];
				dailyIncome[m][z] = [];
				dailyList[m][z] = [];
				z++;
			}
		}
	}
	populateCalendar();
	updateSelectedDay(days[date-1]+firstDay);

	currentDay = new Date().getDay();
	const rows = document.querySelectorAll("table tr");

	rows.forEach(function(row) {
		const cells = row.querySelectorAll("td");
		cells.forEach(function(cell) {
			cell.addEventListener("click", function() {
				updateSelectedDay(this.id);
			});
		});
	});
})

function updateTotalsDisplay(remove, expense, income) {
	let incomeTotal = 0;
	let numIncomes = 0;
	let expenseTotal = 0;
	let numExpenses = 0;
	let finalTotal = 0;
	totalExpenses = 0;
	totalIncome = 0;
	let monthlyExpenses = 0;
	let monthlyIncome = 0;
	if (dailyIncome[month][selectedDay]) {
		incomeTotal = dailyIncome[month][selectedDay].reduce((a, b) => Number(a) + Number(b), 0);
		numIncomes = dailyIncome[month][selectedDay].length;
	}
	
	if (dailyExpenses[month][selectedDay]) {
		expenseTotal = dailyExpenses[month][selectedDay].reduce((a, b) => Number(a) + Number(b), 0);
		numExpenses = dailyExpenses[month][selectedDay].length;
	}

	finalTotal = (incomeTotal || 0) + (expenseTotal || 0);
	
	let avgExpensePerDay = numExpenses > 0 ? Math.abs(expenseTotal) / numExpenses : 0;
	let avgIncomePerDay = numIncomes > 0 ? incomeTotal / numIncomes : 0;
	
	


	if (numExpenses > 0) {
		avgExpensePerDay = Math.abs(expenseTotal) / numExpenses;
	} else {
		avgExpensePerDay = 0;
	}
	if (numIncomes > 0) {
		avgIncomePerDay = incomeTotal / numIncomes;
	}
	else {
		avgIncomePerDay = 0;
	}
	totalExpenses = 0;
	totalIncome = 0;
	for (let y = 0; y < 12; y++) {
		for (let i = 0; i < 43; i++) {
			if (dailyExpenses[y][i] != null) {
				totalExpenses += dailyExpenses[y][i].reduce((a, b) => Number(a) + Number(b), 0);
			}
			if (dailyIncome[y][i]) {
				totalIncome += dailyIncome[y][i].reduce((a, b) => Number(a) + Number(b), 0);
			}
		}
	}
	for (let i = 0; i < 43; i++) {
		if (dailyExpenses[month][i] != null) {
			monthlyExpenses += dailyExpenses[month][i].reduce((a, b) => Number(a) + Number(b), 0);
		}
		if (dailyIncome[month][i]) {
			monthlyIncome += dailyIncome[month][i].reduce((a, b) => Number(a) + Number(b), 0);
		}
	}
	let numIncomesMonth = 0;
	for (let i = 0; i < 43; i++) {
		if (dailyIncome[month][i]) {
			numIncomesMonth += dailyIncome[month][i].length;
		}
	}
	let numExpensesMonth = 0;
	for (let i = 0; i < 43; i++) {
		if (dailyExpenses[month][i]) {
			numExpensesMonth += dailyExpenses[month][i].length;
		}
	}
	let averageExpensePerMonth = monthlyExpenses / (numExpensesMonth || 1);
	let averageIncomePerMonth = monthlyIncome / (numIncomesMonth || 1);
	let totalMonthlyAverage = averageIncomePerMonth + averageExpensePerMonth;
	let averageDailyBalance = avgIncomePerDay + avgExpensePerDay;
	let totalMonthly = monthlyExpenses + monthlyIncome;
	let totalFinal = totalIncome + totalExpenses;
	
	document.getElementById("totalExpenses").innerHTML = "Total Expenses: $" + totalExpenses.toFixed(2);
	document.getElementById("totalIncome").innerHTML = "Total Income: $" + totalIncome.toFixed(2);
	document.getElementById("totalBalance").innerHTML = "Total Balance: $" + totalFinal.toFixed(2);
	document.getElementById("monthlyExpenses").innerHTML = "Monthly Expenses: $" + monthlyExpenses.toFixed(2);
	document.getElementById("monthlyIncome").innerHTML = "Monthly Income: $" + monthlyIncome.toFixed(2);
	document.getElementById("monthlyBalance").innerHTML = "Monthly Balance: $" + totalMonthly.toFixed(2);
	document.getElementById("averageExpenses").innerHTML = "Average Expenses For Today: $" + avgExpensePerDay.toFixed(2);
	document.getElementById("averageIncome").innerHTML = "Average Incomes For Today: $" + avgIncomePerDay.toFixed(2);
	document.getElementById("averageBalance").innerHTML = "Average Current Day Balance: $" + averageDailyBalance.toFixed(2);
	document.getElementById("averageMonthlyExpenses").innerHTML = "Average Monthly Expenses: $" + averageExpensePerMonth.toFixed(2);
	document.getElementById("averageMonthlyIncome").innerHTML = "Average Monthly Income: $" + averageIncomePerMonth.toFixed(2);
	document.getElementById("averageMonthly").innerHTML = "Average Monthly Balance: $" + totalMonthlyAverage.toFixed(2);
	document.getElementById("currentDayExpenses").innerHTML = "Day Current Expenses: $" + totalExpenses.toFixed(2);
	document.getElementById("currentDayIncome").innerHTML = "Day Current Income: $" + totalIncome.toFixed(2);
	document.getElementById("currentDayBalance").innerHTML = "Day Current Balance: $" + finalTotal.toFixed(2);
}

function populateCalendar(move) {
	for (i = 0; i < 42; i++) {
		divList[month][i] = divList[month][i] || [];
	}
	if (move) {
		// Hide current month's items
		for (let z = 0; z < 42; z++) {
			if (divList[month][z]) {
				for (let y = 0; y < divList[month][z].length; y++) {
					if (divList[month][z][y]) {
						divList[month][z][y].style.display = "none";
					}
				}
			}
		}

		change = change + move;
		month = month + move;

		for (let z = 0; z < 42; z++) {
			if (divList[month][z]) {
				for (let y = 0; y < divList[month][z].length; y++) {
					if (divList[month][z][y]) {
						divList[month][z][y].style.display = "block";
					}
				}
			}
		}
	}

	firstDay = new Date(year, change, 1).getDay();
	lastDay = new Date(year, change+1, 0).getDate();
	let w = 1;
	for (i = 0; i < 42; i++) {
		if (i >= firstDay && i < lastDay + firstDay) {
			document.getElementById(i).innerHTML = w;
			document.getElementById(i).style = "color:rgb(48, 97, 222)";
			w++;
		}
		else {
			document.getElementById(i).style = "color: transparent";
		}
	}
	updateTotalsDisplay();
	document.getElementById("monthTitle").innerHTML = months[new Date(year, change, 1).getMonth()];
	document.getElementById("yearTitle").innerHTML = new Date(year, change, 1).getFullYear();
}

function addExpenses() {
	if (document.getElementById("input").value) {
		if (document.getElementById("price-input").value) {
			var expense = document.createElement("div");
			expense.className = "expense";
			var amount = document.getElementById("price-input").value * -1;
			expense.innerHTML = document.getElementById("input").value + " $-" + Math.abs(amount);
			expense.dataset.amount = amount;
			expense.dataset.day = selectedDay;
			document.getElementById("listTitle").appendChild(expense);
			dailyExpenses[month][selectedDay].push(amount);
			divList[month][selectedDay].push(expense);
			var button = document.createElement("button");
			button.innerHTML = "-";
			button.className = "removeButton";
			button.onclick = removeExpense;
			expense.appendChild(button);
			document.getElementById("input").value="";
			document.getElementById("price-input").value="";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			dailyList[month][currentDay][0] = expense;
			dailyList[month][currentDay][1] = button;
			updateTotalsDisplay(false, true, false);
		}
		else {
			document.getElementById("price-input").style.backgroundColor = "red";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
		}
	}
	else {
		if (document.getElementById("price-input").value) {
			document.getElementById("input").style.backgroundColor = "red";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
		}
		else {
			document.getElementById("price-input").style.backgroundColor = "red";
			document.getElementById("input").style.backgroundColor = "red";
		}
	}
}

function addIncome() {
	if (document.getElementById("input").value) {
		if (document.getElementById("price-input").value) {
			var income = document.createElement("div");
			income.className = "income";
			var amount = Number(document.getElementById("price-input").value);
			income.innerHTML = document.getElementById("input").value + " $" + amount;
			income.dataset.amount = amount;
			income.dataset.day = selectedDay;
			document.getElementById("listTitle").appendChild(income);
			dailyIncome[month][selectedDay].push(amount);
			divList[month][selectedDay].push(income);
			var button = document.createElement("button");
			button.innerHTML = "-";
			button.className = "removeButton";
			button.onclick = removeIncome;
			income.appendChild(button);
			document.getElementById("input").value="";
			document.getElementById("price-input").value ="";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			updateTotalsDisplay(false, false, true);
		}
		else {
			document.getElementById("price-input").style.backgroundColor = "red";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
		}
	}
	else {
		if (document.getElementById("price-input").value) {
			document.getElementById("input").style.backgroundColor = "red";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
		}
		else {
			document.getElementById("price-input").style.backgroundColor = "red";
			document.getElementById("input").style.backgroundColor = "red";
		}
	}
}

function removeExpense() {
	const element = this.parentElement;
	const amount = Number(element.dataset.amount);
	const day = element.dataset.day;
	const index = dailyExpenses[month][day].indexOf(amount);
	if (index > -1) {
		dailyExpenses[month][day].splice(index, 1);
	}
	expensesNumber.pop();
	document.getElementById("listTitle").removeChild(element);
	updateTotalsDisplay(true, true, false);
}

function removeIncome() {
	const element = this.parentElement;
	const amount = Number(element.dataset.amount);
	const day = element.dataset.day;
	const index = dailyIncome[month][day].indexOf(amount);
	if (index > -1) {
		dailyIncome[month][day].splice(index, 1);
	}
	incomesNumber.pop();
	document.getElementById("listTitle").removeChild(element);
	updateTotalsDisplay(true, false, true);
}
