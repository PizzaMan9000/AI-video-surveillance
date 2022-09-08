objects = [];
video = "";
objectStatus = "";

function preload() {

    video = createVideo("video.mp4");
}

function setup() {

    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function draw() {

    image(video, 0, 0, 480, 380);

    if (objectStatus != "") {

        objectDetecter.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementsById("numberOfObjects").innerHTML = "Number of objects detected: " + objects.length;
            percentage = floor(objects[i].confidence) * 100;
            fill("#FF0000");
            text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 10);
            nofill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results) {

    if (error) {

        console.log(error);
    }

    console.log(results);
    objects = results;
}

function start() {

    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {

    console.log("model loaded");
    video.loop();
    video.speed(1);
    video.volume(0);

    objectStatus = true;
}