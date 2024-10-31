// 定义动画关键帧，包含初始和结束状态
const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' }, // 初始状态：无旋转，原始大小
    { transform: 'rotate(360deg) scale(0)' } // 结束状态：旋转360度，缩放到0
  ];
  // 定义动画的持续时间、迭代次数和填充模式
  const aliceTiming = {
    duration: 2000, // 动画持续时间：2000毫秒（2秒）
    iterations: 1, // 动画只迭代一次
    fill: 'forwards' // 动画结束后保持最后一帧的状态，不恢复到初始状态
  };
  // 选择所有id为"alice-container"的元素内的图片
  const aliceElements = document.querySelectorAll("#alice-container img");
  const totalElements = aliceElements.length; // 获取元素的总数
  // 定义一个函数，用于递归地执行每两个元素的动画
  function animateThreeElements(index) {
    // 检查索引加1是否小于元素总数，确保至少还有两个元素可以动画
    if (index + 1 < totalElements) {
      // 使用Promise.all来同时执行两个元素的动画，并等待它们都完成
      Promise.all([
        aliceElements[index].animate(aliceTumbling, aliceTiming).finished, // 第一个元素的动画
        aliceElements[index + 1].animate(aliceTumbling, aliceTiming).finished // 第二个元素的动画
      ]).then(() => {
        // 当两个元素的动画都完成后，递归调用animateThreeElements来动画下一组两个元素
        // 参数index + 2表示跳过已经动画过的两个元素
        animateThreeElements(index + 2);
      }).catch(error => {
        // 如果动画过程中出现错误，打印错误信息
        console.error(`Error animating Alices: ${error}`);
      });
    }
  }
  // 从第一组两个元素开始动画，初始索引为0
  animateThreeElements(0);
