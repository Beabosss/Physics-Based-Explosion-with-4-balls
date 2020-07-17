function setup() {
  createCanvas(750, 750);
  frameRate(10)
}


function getPosition(initialPosition, initialVelocity, acceleration, timeElapsed) {
  var circleX = initialPosition["x"] + initialVelocity["vx"] * timeElapsed + 1/2 * acceleration["ax"] * timeElapsed ** 2
  var circleY = initialPosition["y"] + initialVelocity["vy"] * timeElapsed + 1/2 * acceleration["ay"] *  timeElapsed ** 2
  // circle(initialPosition["x"] + initialVelocity["vx"] * timeElapsed + 1/2 * acceleration["ax"] * timeElapsed ** 2, initialPosition["y"] + initialVelocity["vy"] * timeElapsed + 1/2 * acceleration["ay"] *  timeElapsed ** 2, 50)
  return [circleX, circleY]
  }
    
  

let circleX = 0
let circleY = 0
let trejectory = [[]]
let startVelX = 50
let startVelY = -50
let accelerations = [{ax: 0, ay: 9.8}]
let velocities = [{vx: startVelX, vy: startVelY}]
let notYet = true
let startX = 0
let startY = 400
let circleDiameter = 50

function timeFunction(){
  timeElasped += 0.1
  for (var i = 0; i < trejectory.length; i++){
    circlePos = getPosition({x: startX, y: startY}, {vx: velocities[i].vx, vy: velocities[i].vy}, {ax:accelerations[i].ax, ay: accelerations[i].ay}, timeElasped)
    // print(circlePos)
    circleX = circlePos[0]
    circleY = circlePos[1]
    trejectory[i].push({x: circleX, y: circleY})
    drawTrejectory(trejectory[i])
    circle(circleX, circleY, circleDiameter)
  
  }
  // print(Math.floor(timeElasped*10)/10)
  if (Math.floor(timeElasped*10)/10 === 5 && notYet){
   // print("Explode")
   velocities.shift()
   accelerations.shift()
   velocities.push({vx: startVelX + 20, vy: startVelY + 20}) 
   velocities.push({vx: startVelX + 20, vy: startVelY - 20}) 
   velocities.push({vx: startVelX - 20, vy: startVelY - 20}) 
   velocities.push({vx: startVelX - 20, vy: startVelY + 20})
   accelerations.push({ax: 0, ay: 9.8})
   accelerations.push({ax: 0, ay: 9.8})
   accelerations.push({ax: 0, ay: 9.8})
   accelerations.push({ax: 0, ay: 9.8})
   trejectory.push([{x: circleX, y: circleY}])
   trejectory.push([{x: circleX, y: circleY}])
   trejectory.push([{x: circleX, y: circleY}])
   timeElasped = 0
   notYet = false
   startX = circleX
   startY = circleY
   circleDiameter = 25
   
  }

  
  



}

// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

function drawTrejectory(lst){
  for (var i = 0; i < lst.length - 1; i++) {
    // for (var j = 0; j < lst[i].length - 1; j++){
    stroke(255, 0, 0);
    line(lst[i].x, lst[i].y, lst[i + 1].x, lst[i + 1].y)
    // }
}
}

var timeElasped = 0
function draw() {
  fill("red")
  background("white");
  timeFunction() 
}