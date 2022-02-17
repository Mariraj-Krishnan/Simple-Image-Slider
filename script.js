const imgArray = [
  "./assets/img1.jpg",
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./assets/img4.jpg",
  "./assets/img5.jpg",
  "./assets/img6.jpg",
  "./assets/img7.jpg",
  "./assets/img8.jpg",
  "./assets/img9.jpg",
  "./assets/img10.jpg",
];

const container = document.querySelector("#container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const totalImgCount = document.querySelector("p span");
const liveImgCount = document.querySelector("p input");

class imgSlider {
  constructor({
    container,
    imgArray,
    nextBtn,
    prevBtn,
    totalImgCount,
    liveImgCount,
  }) {
    this.container = container;
    this.imgArray = imgArray;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.totalImgCount = totalImgCount;
    this.liveImgCount = liveImgCount;
    this.imgLength = imgArray.length;
    this.renderImages = this.renderImages();
  }
  renderImages() {
    const fragment = document.createDocumentFragment();
    const renderedImages = this.imgArray.map((img, index) => {
      const imgTag = document.createElement("img");
      imgTag.src = img;
      if (index === 0) imgTag.className = "active";
      fragment.append(imgTag);
      return imgTag;
    });
    this.container.append(fragment);
    this.totalImgCount.textContent = this.imgLength;
    this.liveImgCount.value = "1";
    this.previousImage(renderedImages, this);
    this.nextImage(renderedImages, this);
    this.specificImage(renderedImages);
  }
  previousImage(images, objId) {
    this.prevBtn.onclick = function () {
      let index;
      images.find((img, i) => {
        if (img.className) {
          index = i;
        }
        return img.className.includes("active");
      }).className = "";
      if (index == 0) {
        images[images.length - 1].className = "active";
        objId.liveImgCount.value = images.length;
        return;
      }
      images[index - 1].className = "active";
      objId.liveImgCount.value = index;
    };
  }
  nextImage(images, objId) {
    this.nextBtn.onclick = function () {
      let index;
      images.find((img, i) => {
        if (img.className) {
          index = i;
        }
        return img.className.includes("active");
      }).className = "";
      if (index == images.length - 1) {
        images[0].className = "active";
        objId.liveImgCount.value = "1";
        return;
      }
      images[index + 1].className = "active";
      objId.liveImgCount.value = index + 2;
    };
  }
  specificImage(images) {
    const oldValue = this.liveImgCount.value;
    this.liveImgCount.oninput = function () {
      if (
        !Number(this.value) ||
        Number(this.value) > images.length ||
        Number(this.value) <= 0
      ) {
        this.onchange = () => {
          this.value = oldValue;
        };
        return;
      }
      images.find((img) => {
        return img.className;
      }).className = "";
      images[this.value - 1].className = "active";
    };
  }
}
const imgSliderOne = new imgSlider({
  container,
  imgArray,
  nextBtn,
  prevBtn,
  totalImgCount,
  liveImgCount,
});
