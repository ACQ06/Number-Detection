let canvas = document.getElementById("canvas");
canvas.width =  280;
canvas.height = 280;


let ctx = canvas.getContext("2d");
let start_background_color = "black";
ctx.fillStyle = start_background_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "white";
let draw_width = "30";
let is_drawing = false;

let restore_array = []
let index = -1;

canvas.addEventListener("touchstart" , start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event){
    is_drawing = true;
    ctx.beginPath();

    ctx.moveTo(event.clientX - canvas.offsetLeft, 
               event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event){
    if(is_drawing){
        ctx.lineTo(event.clientX - canvas.offsetLeft, 
                   event.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
    event.preventDefault();
}

function stop(event){
    if(is_drawing){
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    
    if(event.type != 'mouseout'){
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}

function clear_canvas(){
    ctx.fillStyle = start_background_color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}

function undo_last(){
    if(index <=0){
        clear_canvas();
    } else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }
}


function predict(){
    console.log('CLICKED');

    var dataURL = canvas.toDataURL();

    var base64 = dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");

    $.ajax({
        type: "POST",
        url: "/handwritten/predict",
        data: { 
           'image': base64
        }
      }).done(function(o) {
        document.getElementById('num').innerHTML = o;
      });
}