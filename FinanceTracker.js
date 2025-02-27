/*Make an array for all of the days in the calendar and then have the td or tr:nth-child(x) in it for each position in the calendar so you can easily just acceses the array to find a postion based on its nth day, and have a starting varible so when you have day 1 start like 3 days in because its a teusday you just add or subtract that to the array calculatitons */
document.addEventListener("DOMContentLoaded", function() {
    var cell = [document.querySelector("tr:nth-child(2) td:nth-child(1)")];

    if (cell[0]) {
        console.log(cell[0].innerHTML);
    } else {
        console.log("The element wasn't found.");
    }
});
var days = [document.querySelector("tr:nth-child(2) td:nth-child(1)")];
console.log(days[0]);
