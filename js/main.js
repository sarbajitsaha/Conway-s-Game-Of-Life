const canvas_height = 400;
const canvas_width = 800;
const block_size = 10;
const rows = 40;
const columns = 80;
const line_width = "0.5";
var life_arr = new Array(rows);
var temp_arr = new Array(columns);
for(var i=0; i<rows; i++){
    life_arr[i] = new Array(columns);
    temp_arr[i] = new Array(columns);
}
var seconds = 800;
var iteration = 0;
var start = false;

PatternEnum = {
    RPENTOMINO: 0,
    GLIDER: 1,
    ACORN: 2,
}

function fillCanvas(){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    for (var i=0; i<rows; i++){
        for (var j=0; j<columns; j++){
            if(checkCanvasPixel(i, j, life_arr)===true){
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "red";
            }
            ctx.strokeStyle = "black";
            ctx.lineWidth = line_width;
            ctx.beginPath();
            ctx.rect((j*block_size),(i*block_size),block_size,block_size);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function checkCanvasPixel(r, c){
    return (life_arr[r][c]===true);
}

function loopGameOfLife(){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    iteration++;
    updateTempArray(rows, columns, life_arr, temp_arr);
    change_made_arr = updateLifeArray(rows, columns, life_arr, temp_arr);
    for(var i=0; i<change_made_arr.length; i+=2){
        x = change_made_arr[i];
        y = change_made_arr[i+1];
        if(life_arr[x][y]===true){
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.rect((y*block_size),(x*block_size),block_size,block_size);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    var population = checkPopulation(rows, columns, life_arr);
    var str = "Iteration: " + iteration + "     Population: " + population;
    $("#details").text(str);
    if(start===true){
        setTimeout(loopGameOfLife,seconds);
    }
}

$(document).ready(function(){
    initialise(rows, columns, life_arr, temp_arr);
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.canvas.width = canvas_width;
    ctx.canvas.height = canvas_height;
    fillCanvas();

    $("#reset").click(function(){
        iteration = 0;
        initialise(rows, columns, life_arr, temp_arr);
        fillCanvas();
        var population = checkPopulation(rows, columns, life_arr);
        var str = "Iteration: " + iteration + "     Population: " + population;
        $("#details").text(str);
    });
    $("#random").click(function(){
        initialise(rows, columns, life_arr, temp_arr);
        randomInitialise(rows, columns, life_arr, Math.floor(Math.random()*3000));
        fillCanvas();
        seconds = 800;
        var population = checkPopulation(rows, columns, life_arr);
        var str = "Iteration: " + iteration + "     Population: " + population;
        $("#details").text(str);
    });
    $("#acorn").click(function(){
        initialise(rows, columns, life_arr, temp_arr);
        patternInitialise(rows, columns, life_arr, PatternEnum.ACORN);
        fillCanvas();
        seconds = 300;
        var population = checkPopulation(rows, columns, life_arr);
        var str = "Iteration: " + iteration + "     Population: " + population;
        $("#details").text(str);
    });
    $("#pentomino").click(function(){
        initialise(rows, columns, life_arr, temp_arr);
        patternInitialise(rows, columns, life_arr, PatternEnum.RPENTOMINO);
        fillCanvas();
        seconds = 500;
        var population = checkPopulation(rows, columns, life_arr);
        var str = "Iteration: " + iteration + "     Population: " + population;
        $("#details").text(str);
    });
    $("#glider").click(function(){
        initialise(rows, columns, life_arr, temp_arr);
        patternInitialise(rows, columns, life_arr, PatternEnum.GLIDER);
        seconds = 300;
        fillCanvas();
        var population = checkPopulation(rows, columns, life_arr);
        var str = "Iteration: " + iteration + "     Population: " + population;
        $("#details").text(str);
    });
    $("#start").click(function(){
        if(start===false){
            start = true;
            loopGameOfLife();
            $("#start").text("Stop");
        } else {
            start = false;
            $("#start").text("Start");
        }
    });

});
