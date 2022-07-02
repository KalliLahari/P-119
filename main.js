quick_draw_data_set=["trafficlight","apple","bee","clock","flower","door","dounut","lamp","spoon","fork","snake","knife","brush","window","specs","leaves"];

random_nom=Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_nom]);

sketch=quick_draw_data_set[random_nom];
document.getElementById("to_draw").innerHTML="Sketch to be drawn "+sketch;

function updatecanvas(){
    background("white");
    random_nom=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(quick_draw_data_set[random_nom]);
    
    sketch=quick_draw_data_set[random_nom];
    document.getElementById("to_draw").innerHTML="Sketch to be drawn "+sketch;
    }

timer_counter=0;
timer_check="";
drawn_sketch="";
answer_holder="";
score=0;

function setup(){
  canvas=createCanvas(350,400);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
}

function check(){
    timer_counter++;
    document.getElementById("timer").innerHTML="Timer : "+timer_counter;
    if(timer_counter > 1000){
        timer_counter=0;
        timer_check="completed";
    }
    if(timer_check=="completed"||answer_holder=="set"){
     timer_check="";
     answer_holder="";
    updatecanvas();
    }
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check();
    if(drawn_sketch==sketch){
        answer_holder="set";
        score++;
        document.getElementById("score").innerHTML="Score : "+score;
    }

    
    }



function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        drawn_sketch=results[0].label;
        document.getElementById("guessed_sketched").innerHTML="Sketch Drawn : "+drawn_sketch;
        document.getElementById("confidence").innerHTML="Confidence : "+Math.round(results[0].confidence*100)+"%";
    }
}
