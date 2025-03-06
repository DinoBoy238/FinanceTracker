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
	updateSelectedDay(days[date-1]); /* make it so when you click a day it changes this to that day and highlights that new day and unhilghts the old day, maybe make it so that same function has the original change color in it too to clean things up*/
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
