const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";

// canvas에 css로 width, height 값을 주는 것 뿐만 아니라 
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에 픽셀 width, height를 줘야한다.
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "#fff";
ctx.fillRect(0,0,canvas.width,canvas.height);

// strokeStyle은 선의 기본 색상을 정한다.
// lineWidth는 선의 기본 너비
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;

  // 마우스를 클릭하지 않아서 painting이 false일 때 캔버스 위에서 움직이면서 좌표값만 받아온다.
  // 마우스를 down하게 되면 painting이 true가 되면서 false일때 최근 path값을 시작으로 마우스를 up할때까지 선을 긋는다.
  if(painting === true){
    // lineTo는 전 위치에서 지금 위치까지 선을 만드는 메소드다.
    ctx.lineTo(x, y);
    // stroke는 현재의 sub-path를 현재의 stroke style로 획을 그은다.
    ctx.stroke();
  }else{
    // beginPath 마우스를 클릭하지 않고 있을 때 마우스가 위치한 곳에 path를 시작한다는 것이다. path = 선
    ctx.beginPath();
    // moveTo 마우스가 위치한 곳의 x, y 좌표값을 가져온다.
    ctx.moveTo(x, y);
  }
}

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

function handleCanvasClick(){
  if(filling == true){
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "test";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM)
}


function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// Array.from() 은 object로부터 array를 만든다
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


/* canvas는 html의 한 요소인데 다른 점은 context를 갖는다는거야. 
context는 이 요소 안에서 우리가 픽셀에 접근할 수 있는 방법이야. 
이론적으로는 이 안에 있는 픽셀들인거지 
getContext()를 만들면 사용할 수 있다. */

function handleRangeChange(event){
  const rangeSize = event.target.value;
  ctx.lineWidth = rangeSize;
}

if(range){
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick(){
  if(filling == true){
    filling = false;
    mode.innerText = "FILL";
  }else{
    filling = true;
    mode.innerText = "PAINT";
  }
  console.log(filling);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}
