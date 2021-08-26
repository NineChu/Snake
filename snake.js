var fps = 100;
var ctx;
var fjogo;
var jogo;
var move;
var movet = true;
var score = 0;

function confirm()
{
    fps = parseInt(1000/document.getElementById("tvel").value);
    clearInterval(fjogo);
    clearInterval(jogo);
    jogo = setInterval(game, fps);
}

window.onload = function()
{
    var ca = document.getElementById("ca");
    ctx = ca.getContext("2d");
    jogo = setInterval(game, fps);
    
    document.getElementById("tvel").addEventListener("keyup", function(event)
    {
        if(event.keyCode === 13)
        {
            event.preventDefault;
            confirm();
        }
    });
}

document.addEventListener("keydown", keyPush);
const vel = 1;
var vx = vy = 0;
var px = 10;
var py = 10;
var tp = 20;
var qp = 20;
var ax = ay = 15;

var trail = [];
var tail = 5;

function game()
{
    px += vx;
    py += vy;
    if (px < 0)
    {
        px = qp - 1;
    }
    if (px > qp - 1)
    {
        px = 0;
    }
    if (py < 0)
    {
        py = qp - 1;
    }
    if (py > qp - 1)
    {
        py = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ca.width, ca.height);

    ctx.fillStyle = "white";
    for (var i = 0; i < trail.length; i++)
    {
        ctx.fillRect(trail[i].x*tp+1, trail[i].y*tp+1, tp-2, tp-2);

        if (trail[i].x == px && trail[i].y == py)
        {
            vx = vy = 0;
            tail = 5;
            score = 0;
        }
        if (trail[i].x == ax && trail[i].y == ay)
        {
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(ax*tp, ay*tp, tp, tp);

    trail.push({ x: px, y: py })
    while (trail.length > tail)
    {
        trail.shift();
    }

    if (ax == px && ay == py)
    {
        tail++;
        score++;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    }
    
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score.toString(), 10, 30);
}
function keyPush()
{
    if((event.keyCode == 87 || event.keyCode == 38) && move != 2 && move != 0 && movet == true)
    {
        vx = 0;
        vy = -vel;
        move = 0;
        movet = false;
        setTimeout(moveD, fps);
    }
    else if((event.keyCode == 65 || event.keyCode == 37) && move != 3 && move != 1 && movet == true)
    {
        vx = -vel;
        vy = 0;
        move = 1;
        movet = false;
        setTimeout(moveD, fps);
    }
    else if((event.keyCode == 83 || event.keyCode == 40) && move != 0 && move != 2 && movet == true)
    {
        vx = 0;
        vy = vel;
        move = 2;
        movet = false;
        setTimeout(moveD, fps);
    }
    else if((event.keyCode == 68 || event.keyCode == 39) && move != 1 && move != 3 && movet == true)
    {
        vx = vel;
        vy = 0;
        move = 3;
        movet = false;
        setTimeout(moveD, fps);
    }
}

function moveD()
{
    movet = true;
}
