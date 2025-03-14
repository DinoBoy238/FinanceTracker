/*Make an array for all of the days in the calendar and then have the td or tr:nth-child(x) in it for each position in the calendar so you can easily just acceses the array to find a postion based on its nth day, and have a starting varible so when you have day 1 start like 3 days in because its a teusday you just add or subtract that to the array calculatitons */
//Waiting for page to load because some varibles need the content of page
var selectedDay;
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDay();
var date = today.getDate();
var firstDay = new Date(year, month, 1).getDay();
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

document.addEventListener("DOMContentLoaded", function() {
	function populateCalendar() {
		
	}

	function updateSelectedDay(day) {
		if (selectedDay) {
			document.getElementById(selectedDay).style.backgroundColor = "gray";
			const elements = document.querySelectorAll(`[data-day="${selectedDay}"]`);
			elements.forEach(function(element) {
				element.style.display = "none";
			});
		}
		const newElements = document.querySelectorAll(`[data-day="${day}"]`);
		newElements.forEach(element => {
			element.style.display = "block";
		});
		document.getElementById(day).style.backgroundColor = "green";
		selectedDay = day;
		
		updateTotalsDisplay(remove = false);
	}

	for (var i = 2; i < 8; i++){
		for (var y = 1; y < 8; y++) {
			//Backticks to properly interpolate the varible into the string
			days.push(Number(document.querySelector(`tr:nth-child(${i}) td:nth-child(${y})`).id = z));
			dailyTotals[z] = [];
			dailyExpenses[z] =[];
			dailyIncome[z] = [];
			dailyList[z] = [];
			z++;
		}
	}
	updateSelectedDay(days[date-1]);

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
	let incomeTotal = dailyIncome[selectedDay].reduce((a, b) => Number(a) + Number(b), 0);
	let expenseTotal = dailyExpenses[selectedDay].reduce((a, b) => Number(a) + Number(b), 0);
	let finalTotal = incomeTotal + expenseTotal;
	let numExpenses = dailyExpenses[selectedDay].length;
	let numIncomes = dailyIncome[selectedDay].length;
	let avgExpensePerDay;
	let avgIncomePerDay;


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
	
	for (let i = 0; i < 43; i++) {
		if (dailyExpenses[i] != null) {
			totalExpenses += dailyExpenses[i].reduce((a, b) => Number(a) + Number(b), 0);
		}
		if (dailyIncome[i]) {
			totalIncome += dailyIncome[i].reduce((a, b) => Number(a) + Number(b), 0);
		}
	}
	
	let totalFinal = totalIncome + totalExpenses;
	document.getElementById("currentDayBalance").innerHTML = "Day Current Balance: $" + finalTotal.toFixed(2);
	document.getElementById("currentDayBalance").innerHTML = "Day Current Balance: $" + finalTotal.toFixed(2);
	document.getElementById("totalExpenses").innerHTML = "Total Expenses: $" + totalExpenses.toFixed(2);
	document.getElementById("totalIncome").innerHTML = "Total Income: $" + totalIncome.toFixed(2);
	document.getElementById("totalBalance").innerHTML = "Total Balance: $" + totalFinal.toFixed(2);
	document.getElementById("monthlyExpenses").innerHTML = "Monthly Expenses: $" + totalExpenses.toFixed(2);
	document.getElementById("monthlyIncome").innerHTML = "Monthly Income: $" + totalIncome.toFixed(2);
	document.getElementById("monthlyBalance").innerHTML = "Monthly Balance: $" + totalFinal.toFixed(2);
	document.getElementById("averageExpenses").innerHTML = "Average Expenses Per Today: $" + avgExpensePerDay.toFixed(2);
	document.getElementById("averageIncome").innerHTML = "Average Incomes Per Today: $" + avgIncomePerDay.toFixed(2);
	document.getElementById("averageBalance").innerHTML = "Current Day Balance: $" + finalTotal.toFixed(2);
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
			dailyExpenses[selectedDay].push(amount);
			var button = document.createElement("button");
			button.innerHTML = "-";
			button.className = "removeButton";
			button.onclick = removeExpense;
			expense.appendChild(button);
			document.getElementById("input").value="";
			document.getElementById("price-input").value="";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			dailyList[currentDay][0] = expense;
			dailyList[currentDay][1] = button;
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
			dailyIncome[selectedDay].push(amount);
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
	const index = dailyExpenses[day].indexOf(amount);
	if (index > -1) {
		dailyExpenses[day].splice(index, 1);
	}
	expensesNumber.pop();
	document.getElementById("listTitle").removeChild(element);
	updateTotalsDisplay(true, true, false);
}

function removeIncome() {
	const element = this.parentElement;
	const amount = Number(element.dataset.amount);
	const day = element.dataset.day;
	const index = dailyIncome[day].indexOf(amount);
	if (index > -1) {
		dailyIncome[day].splice(index, 1);
	}
	incomesNumber.pop();
	document.getElementById("listTitle").removeChild(element);
	updateTotalsDisplay(true, false, true);
}
