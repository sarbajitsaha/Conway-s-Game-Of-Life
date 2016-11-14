function checkPopulation(r, c, life_arr){
    var num = 0;
    for (var i=0; i<r; i++){
        for (var j=0; j<c; j++){
            if (life_arr[i][j]===true){
                num++;
            }
        }
    }
    return num;
}

function updateLifeArray(r, c, life_arr, temp_arr){
    change_made_arr = [];
    for (var i=0; i<r; i++){
        for (var j=0; j<c; j++){
            var chance = temp_arr[i][j];
            if(chance==1){
                life_arr[i][j] = true;
                change_made_arr.push(i,j);
            } else if(chance==-1){
                life_arr[i][j] = false;
				change_made_arr.push(i,j);
            }
        }
    }
	return change_made_arr;
}

/*conditions
  Survivals. Every counter with two or three neighboring counters survives for the next generation.
  Deaths. Each counter with four or more neighbors dies (is removed) from overpopulation. Every counter with one neighbor or none dies from isolation.
  Births. Each empty cell adjacent to exactly three neighbors--no more, no fewer--is a birth cell. A counter is placed on it at the next move.
*/
function updateTempArray(r, c, life_arr, temp_arr){
    for (var i=0; i<r; i++){
        for (var j=0; j<c; j++){
            adjascent_present = 0;
            for (var x=-1; x<=1; x++){
                for (var y=-1; y<=1; y++){
                    if (x!==0 || y!==0){
                        if (i+x>=0 && j+y>=0 && i+x<r && j+y<c){
                            if (life_arr[i+x][j+y]===true){
                                adjascent_present++;
                            }
                        }
                    }
                }
            }
            if (life_arr[i][j]===true){
                if (adjascent_present===2 || adjascent_present===3){
					temp_arr[i][j] = 0;
				} else {
					temp_arr[i][j] = -1;
				}
            } else {
                if (adjascent_present===3) {
					temp_arr[i][j] = 1;
				} else {
                	temp_arr[i][j] = 0;
				}
            }
        }
    }
}

function randomInitialise(r, c, life_arr, size){
    while(size>0){
        var i = Math.floor(Math.random() * r);
        var j = Math.floor(Math.random() * c);
        if(life_arr[i][j]===false){
            life_arr[i][j] = true;
            size--;
        }
    }
}

function initialise(r, c, life_arr, temp_arr){
    for (var i=0; i<r; i++){
        for (var j=0; j<c; j++){
            life_arr[i][j] = false;
            temp_arr[i][j] = 0;
        }
    }
}

function patternInitialise(r,c, life_arr, choice){
    switch (choice) {
        case 0:
            //R pentomino
            i = 20;
            j = 40;
            life_arr[i][j] = true;
            life_arr[i][j-1] = true;
            life_arr[i][j+1] = true;
            life_arr[i-1][j] = true;
            life_arr[i+1][j+1] = true;
            break;
        case 1:
            //glider
            i = 35;
            j = 5;
            life_arr[i+1][j] = true;
            life_arr[i][j+1] = true;
            life_arr[i-1][j] = true;
            life_arr[i-1][j+1] = true;
            life_arr[i-1][j-1] = true;
            break;
        case 2:
            //acorn
            i = 20;
            j = 40;
            for( var k=1;k<=7;k++){
                if(k!=3 && k!=4){
                    life_arr[i+3][k+j] = true;
                }
            }
            life_arr[i+2][j+4] = true;
            life_arr[i+1][j+2] = true;
            break;
        default:

    }
}
