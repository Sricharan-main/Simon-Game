BoxColor=['green','red','yellow','blue'];
CompGenPattern=[];
UsrPattern=[];
level=0;
start=false;
function SequenceGen(){
    UsrPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var RandNum=Math.floor(Math.random()*4);
    var RandColor=BoxColor[RandNum];
    CompGenPattern.push(RandColor);
    $("#" + RandColor).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(RandColor);
}

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        SequenceGen();
        start=true;
    }
});

function PlaySound(color){
    var Sound=new Audio("sounds/"+color+".mp3");
    Sound.play();
}

function Animation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function CheckAns(length){
    if(UsrPattern[length]===CompGenPattern[length]){
        if(UsrPattern.length===CompGenPattern.length){
            setTimeout(function(){
                SequenceGen();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
        PlaySound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart Game");
        setTimeout(function(){
            $("body").removeClass("game-over")
      },1000);
      Restart();
    }
}

function Restart(){
    start=false;
    CompGenPattern=[];
    level=0;
}

$(".btn").click(function(){
    var ClickColor=$(this).attr('id');
    UsrPattern.push(ClickColor);
    PlaySound(ClickColor);
    Animation(ClickColor);
    CheckAns(UsrPattern.length-1);
});
