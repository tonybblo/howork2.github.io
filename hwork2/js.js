// 获取主显示图片元素
const displayedImage = document.querySelector('.displayed-img');
// 获取缩略图容器元素
const thumbBar = document.querySelector('.thumb-bar');

// 定义图片文件名数组
const images = ['1.jpg', `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`,'6.jpg'];
// 定义每张图片对应的替代文本
const alts = {
  '1.jpg' : 'firstone',
  '2.jpg' : 'secondone',
  '3.jpg' : 'thirdone',
  '4.jpg' : 'fourthone',
  '5.jpg' : 'fifthone',
  '6.jpg' : 'sixthone'
}
// 遍历图片数组，创建缩略图
for (const image of images) {
  // 创建新的图片元素
  const newImage = document.createElement('img');
  // 设置图片源路径
  newImage.setAttribute('src', `images/${image}`);
  // 设置图片替代文本
  newImage.setAttribute('alt', alts[image]);
  // 将图片添加到缩略图容器中
  thumbBar.appendChild(newImage);
  // 为每个缩略图添加点击事件监听器
  newImage.addEventListener('click', e => {
    // 点击时更新主显示图片的源路径
    displayedImage.src = e.target.src;
    // 同时更新主显示图片的替代文本
    displayedImage.alt = e.target.alt;
  });
}

// 等待 DOM 完全加载后再执行亮度调节代码
document.addEventListener('DOMContentLoaded', () => {
    // 获取亮度滑块元素
    const brightnessSlider = document.querySelector('#brightness');
    // 获取亮度值显示元素
    const brightnessValue = document.querySelector('.brightness-value');
    // 获取需要调节亮度的图片元素
    const displayedImg = document.querySelector('.displayed-img');
    // 检查所需元素是否都存在
    if (brightnessSlider && brightnessValue && displayedImg) {
        // 为亮度滑块添加输入事件监听器
        brightnessSlider.addEventListener('input', function() {
            // 获取当前滑块值
            const value = this.value;
            // 更新亮度值显示
            brightnessValue.textContent = value + '%';
            // 应用亮度滤镜到图片
            displayedImg.style.filter = `brightness(${value}%)`;
        });
        // 初始化亮度值为100%
        brightnessSlider.value = 100;
        // 设置初始显示文本
        brightnessValue.textContent = '100%';
        // 设置初始亮度滤镜
        displayedImg.style.filter = 'brightness(100%)';
    } 
});

