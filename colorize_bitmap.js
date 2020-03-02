
let s1 = [    [0,1,0,0,0,1,1,0,1],
              [0,1,0,0,0,0,1,0,1],
              [0,1,0,0,0,1,1,0,0],
              [0,1,0,0,0,0,0,0,0],
              [0,0,0,0,1,1,1,1,1],
              [0,0,0,0,0,1,1,0,1],
              [0,1,1,0,1,1,1,0,1],
              [0,1,0,1,0,1,0,0,1],
              [0,1,1,1,0,0,0,0,1]];

function displayScreen(screen){
  
console.log("*********SCREEN***********");
  for(let i= 0; i < screen.length; i++){
    let row = " ";
    for(let j=0; j < screen[i].length; j++){
      row = row + screen[i][j] + " ";
    }
    console.log(row);
  }
}



function colorizeScreen(screen){
  
  let currentQueue = screen[0][0];
  let currentStack = [];
  let current = {x:0, y:0};
  let deadEnd = true;
  let currentColor = 1;
    
  do{
      
    deadEnd = false;

    //set the color to the current
    if(screen[current.x][current.y] === 1){

      let colorSet = false;
      //go up
      if(current.y > 0){
        if(screen[current.x][current.y-1] > 1){
          colorSet = true;
        }
      }

      if(colorSet === false){
        if(current.x > 0){
          if(screen[current.x-1][current.y] > 1){
            colorSet = true;
          }
        }
      }


      if(colorSet === false){
        if(current.y < screen.length-1){
          if(screen[current.x][current.y+1] > 1){
            colorSet = true;
          }
        }
      }

      if(colorSet === false){
        if(current.x < screen[0].length-1){
          if(screen[current.x+1][current.y] > 1){
            colorSet = true;
          }
        }
      }

      //found color in adjacent cell... so set it to that color
      if(colorSet === true){
        
        screen[current.x][current.y] = currentColor;

      }//adjacent cell with color not found so increment color value and set it
      else{
        currentColor++;
        screen[current.x][current.y] = currentColor;
      }
    }
    
    let currentCellColor = screen[current.x][current.y];
    

    //advance to adjacent cell upwards
    if(currentCellColor > 1 && current.y > 0 && screen[current.x][current.y-1] == 1){
        currentStack.push({x:current.x,y:current.y});
        current = {x: current.x, y: current.y-1};
    } //advance to adjacent cell leftwards
    else if(currentCellColor > 1 && current.x > 0 && screen[current.x-1][current.y] === 1){
        currentStack.push({x:current.x,y:current.y});
        current = {x: current.x-1, y: current.y};
    }//advance to adjacent cell rightwards
    else if(currentCellColor > 1 && current.x < screen.length-1 && screen[current.x+1][current.y] == 1){
        currentStack.push({x:current.x,y:current.y});
        current = {x: current.x+1, y: current.y};
    }//advance to adjacent cell dowwards
    else if(currentCellColor > 1 && current.y < screen.length-1 && screen[current.x][current.y+1] == 1){
        currentStack.push({x:current.x,y:current.y});
        current = {x: current.x, y: current.y+1};
    }//no adjacent cell to advance to advance to a cell on the stack
    else if(currentCellColor > 1 && currentStack.length > 0){
        current = currentStack.pop();
    }
    else{
        //if no cell on the stack scan through to find the next image in the bitmap
        current = {x:0, y:0};
        for(let i = current.x; i < screen.length; i++){
          for(let j = current.y; j < screen.length; j++){
             if(screen[i][j] == 1){
                current = {x: i, y: j};
                break;
             }
          }
          if(current.x > 0 )
            break;
        }
        
        //if no image found... then it has reached a dead end
        if(current.x == 0 && current.y == 0){
          deadEnd = true;
        }
    }
    
  }
  while(!deadEnd);
}
    
displayScreen(s1);
colorizeScreen(s1);
displayScreen(s1);
