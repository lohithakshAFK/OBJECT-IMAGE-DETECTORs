object = [];
portal = "";
object_detector = "";   

function preload(){
    img = loadImage("laptop.jpg");
}

function setup(){
    canvas = createCanvas(500,350);
    canvas.center();

    
    object_detector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting";
}

function modelLoaded(){
    console.log("cocossd LOADED");
    portal = true;
    object_detector.detect(img,gotResults)
}


function draw(){
    image(img,0,0,500,350);

    if(portal != ""){
        for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status : Detected";
            fill("red");
            stroke("red")
            noFill()
            percent = floor(object[i].confidence * 100);
            text(object[i].label +  "  " + percent + "%", object[i].x + 10, object[i].y + 20);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
            
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results); 
        object = results;  
    }
}

