song1="";
song2="";
rightwristscore=0;
leftwristscore=0;
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide()
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("modelisloaded");
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
rightwristscore=results[0].pose.keypoints[10].score;
leftwristscore=results[0].pose.keypoints[9].score;
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("blue");
    stroke("blue");
    if (rightwristscore>0){
        circle(rightwristx,rightwristy,20);
        song2.stop();
        if (song1_status==false){
            song1.play();
document.getElementById("songname").innerHTML="playing harry pottertheme song";
        }
    }
    if (leftwristscore>0){
        circle(leftwristx,leftwristy,20);
        song1.stop();
        if (song2_status==false){
            song2.play();
            document.getElementById("songname").innerHTML="playing peter pan song";
        }
    }
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}