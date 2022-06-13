const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

// canvas에 css로 width, height 값을 주는 것 뿐만 아니라 
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에 픽셀 width, height를 줘야한다.
canvas.width = 700;
canvas.height = 700;

// strokeStyle은 선의 기본 색상을 정한다.
// lineWidth는 선의 기본 너비
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;

  // 마우스를 클릭하지 않아서 painting이 false일 때 캔버스 위에서 움직이면서 좌표값만 받아온다.
  // 마우스를 down하게 되면 painting이 true가 되면서 false일때 최근 path값을 시작으로 마우스를 up할때까지 선을 긋는다.
  if(!painting){
    // beginPath 마우스를 클릭하지 않고 있을 때 마우스가 위치한 곳에 path를 시작한다는 것이다. path = 선
    ctx.beginPath();
    // moveTo 마우스가 위치한 곳의 x, y 좌표값을 가져온다.
    ctx.moveTo(x, y);
  }else{
    // lineTo는 전 위치에서 지금 위치까지 선을 만드는 메소드다.
    ctx.lineTo(x, y);
    // stroke는 현재의 sub-path를 현재의 stroke style로 획을 그은다.
    ctx.stroke();
  }
}

function onMouseDown(event){
  painting = true;
}

function onMouseUp(event){
  stopPainting();
}

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}