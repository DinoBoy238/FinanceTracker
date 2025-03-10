/*Make an array for all of the days in the calendar and then have the td or tr:nth-child(x) in it for each position in the calendar so you can easily just acceses the array to find a postion based on its nth day, and have a starting varible so when you have day 1 start like 3 days in because its a teusday you just add or subtract that to the array calculatitons */
//Waiting for page to load because some varibles need the content of page
document.addEventListener("DOMContentLoaded", function() {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getMonth();
	var date = today.getDate();
	var days = [];
	var selectedDay;
	let z = 0;

	function updateSelectedDay(day) {
		if (selectedDay) {
			document.getElementById(selectedDay).style.backgroundColor = "gray";
		}
		document.getElementById(day).style.backgroundColor = "green";
		selectedDay = day;
	}

	for (var i = 2; i < 8; i++){
		for (var y = 1; y < 8; y++) {
			//Backticks to properly interpolate the varible into the string
			days.push(Number(document.querySelector(`tr:nth-child(${i}) td:nth-child(${y})`).id = z));
			z++;
		}
	}
	updateSelectedDay(days[date-1]);
	console.log(days[date-1]);

	const currentDay = new Date().getDay();
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
function addExpenses() {
	if (document.getElementById("input").value) {
		if (document.getElementById("price-input").value) {
			var expense = document.createElement("div");
			expense.className = "expense";
			expense.innerHTML = document.getElementById("input").value;
			document.getElementById("listTitle").appendChild(expense);
			var button = document.createElement("button");
			button.innerHTML = "-";
			button.className = "removeButton";
			button.onclick = removeExpense;
			expense.appendChild(button);
			document.getElementById("input").value="";
			document.getElementById("price-input").value="";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
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
			income.innerHTML = document.getElementById("input").value;
			document.getElementById("listTitle").appendChild(income);
			var button = document.createElement("button");
			button.innerHTML = "-";
			button.className = "removeButton";
			button.onclick = removeExpense;
			income.appendChild(button);
			document.getElementById("input").value="";
			document.getElementById("price-input").value ="";
			document.getElementById("input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
			document.getElementById("price-input").style.backgroundColor = "rgb(" +138+ "," +193+ "," +255+ ")";
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
	document.getElementById("listTitle").removeChild(this.parentElement);
}
