# weatherFront
The front-end for my weather pressure, health application.


## https://github.com/indexzero/http-server

`http-server` localhost:8080


## make new entry
- date of symptoms
- pain-rank, 1 - 9
- mood-rating, 1 - 9
- note, Describe symptoms
- symptoms, list symptoms
- medication, list medications

list past entries


## Prototype methods for Chart.js

.getPointsAtEvent( event )
canvas.onclick = function(evt){
  var activePoints = myLineChart.getPointsAtEvent(evt);
};

.update( )
myLineChart.datasets[0].points[2].value = 50;
myLineChart.update();

.addData( valuesArray, label )
myLineChart.addData([40, 60], "August");

.removeData( )
myLineChart.removeData();
