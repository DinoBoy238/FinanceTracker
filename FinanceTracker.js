/*Make an array for all of the days in the calendar and then have the td or tr:nth-child(x) in it for each position in the calendar so you can easily just acceses the array to find a postion based on its nth day, and have a starting varible so when you have day 1 start like 3 days in because its a teusday you just add or subtract that to the array calculatitons */
//Waiting for page to load because some varibles need the content of page
document.addEventListener("DOMContentLoaded", function() {
var days = [/*Number(document.querySelector("tr:nth-child(2) td:nth-child(1)").innerHTML)*/];
for (var i = 2; i < 8; i++){
	for (var y = 1; y < 8; y++) {
		//Added backticks to properly interpolate the varible into the string
		days.push(Number(document.querySelector(`tr:nth-child(${i}) td:nth-child(${y})`).innerHTML));
	}
}
console.log(days);
});
