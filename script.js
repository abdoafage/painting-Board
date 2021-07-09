class PaintingBoard {
  constructor() {
    this.Colors = document.getElementById("colors");
    this.sizeFont = document.getElementById("sizeFont");
    this.clear = document.getElementById("clear");
    this.switchLight = document.getElementById("switch-light");
    this.Canvas = document.getElementById("our-canvas");
    this.ctx = this.Canvas.getContext("2d");
    this.arrowDown = document.querySelector(".arrow-down");
    this.arrow=document.querySelector(".arrow-down img");
    this.setting = document.querySelector(".setting");
    this.eraser = document.getElementById("eraser");
    this.undo = document.getElementById("undo");
    this.eraserMode = null;
    this.settingUP = {
      light: null,
      down: null,
    };
    this.drawing = null;
    this.arrTest = [];
    this.store_img = [];
  }
  setup() {
    this.eraserMode = false;
    this.settingUP.light = true;
    this.settingUP.down = false;
    this.Canvas.width = document.body.offsetWidth;
    this.Canvas.height = document.body.offsetHeight;
    this.ctx.lineWidth = sizeFont.value;
    this.ctx.lineCap = "round";
    this.drawing = false;
    this.setting.style.top = -this.setting.offsetHeight;
  }
  draw(x, y) {
    if (!this.drawing) return;
    this.ctx.strokeStyle = this.Colors;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    // this.arrTest.push([x, y]);
  }
  listeners() {
    this.undo.addEventListener("click", () => {
      if (this.store_img.length <= 1) {
        this.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
      } else {
        this.store_img.pop();
        this.ctx.putImageData(this.store_img[this.store_img.length - 1], 0, 0);
      }
    });

    this.eraser.addEventListener("click", () => {
      this.eraserMode = !this.eraserMode;
      // some code here
    });

    this.clear.addEventListener("click", () => {
      this.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    });

    this.sizeFont.addEventListener("change", () => {
      this.ctx.lineWidth = sizeFont.value;
    });

    this.Colors.addEventListener("change", () => {
      this.ctx.strokeStyle = this.Colors.value;
    });

    this.switchLight.addEventListener("click", (e) => {
      this.Canvas.style.background = this.settingUP.light ? "black" : "white";
      this.settingUP.light = this.settingUP.light ? false : true;
    });

    this.arrowDown.addEventListener("click", (e) => {
      if (this.settingUP.down == false) {
        this.setting.style.top = 10;
        this.settingUP.down = true;
        this.arrow.src="photos/chevron-up-solid.svg";
      } else {
        this.settingUP.down = false;
        this.setting.style.top = -this.setting.offsetHeight;
        this.arrow.src="photos/chevron-down-solid.svg";
      }
    });

    this.Canvas.addEventListener("mousemove", (e) => {
      this.draw(e.offsetX, e.offsetY);
    });

    this.Canvas.addEventListener("mousedown", (e) => {
      this.drawing = this.eraserMode == false ? true : false;
      this.draw(e.offsetX, e.offsetY);
    });

    this.Canvas.addEventListener("mouseup", (e) => {
      this.drawing = false;
      this.ctx.beginPath();
      this.store_img.push(
        this.ctx.getImageData(0, 0, this.Canvas.width, this.Canvas.height)
      );
    });
  }
  run() {
    this.setup();
    this.listeners();
  }
}

let obj = new PaintingBoard();
obj.run();
