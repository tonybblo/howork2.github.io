// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了第一个线索...");
        }, 1000);
      });
    }
  
    static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!clue) {
            reject("没有线索可以解码!");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }
  
    static searchTemple(location) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.1) {  // 设置失败概率
            reject("糟糕!遇到了神庙守卫!");
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }
  
    static solveTemplePuzzle() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.1) {
            reject("解谜失败!你被困在神庙中...");
          }
          resolve("成功解开神庙的谜题，箱子打开了!");
        }, 1500);
      });
    }
  
    static unlockHiddenPassage() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("你发现了一个隐藏的通道，进入了秘密房间...");
        }, 1500);
      });
    }
  
    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 1000);
      });
    }
  }
  
  // 等待按钮点击进行阶段性推进
  document.getElementById('startBtn')?.addEventListener('click', async () => {
    document.getElementById('startBtn').disabled = true;
    await findTreasureWithPromises();
  });
  
  async function findTreasureWithPromises() {
    const messageDiv = document.getElementById('message');
    const loadingDiv = document.getElementById('loading');
    const storyImage = document.getElementById('story-image');
  
    // 初始情节：寻找第一个线索
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你站在一座古老的图书馆前，开始寻找第一个线索...';
    storyImage.src = "images/library.jpg"; // 图书馆图片
  
    let clue = await TreasureMap.getInitialClue();
    loadingDiv.style.display = 'none';
    messageDiv.textContent = clue;
  
    // 创建并显示下一步按钮
    createNextButton("解码古老的文字", () => decodeAncientScript(clue));
  
    async function decodeAncientScript(clue) {
      loadingDiv.style.display = 'block';
      messageDiv.textContent = '你发现了古老的文字，开始解码...';
      storyImage.src = "images/ancient_script.jpg"; // 解码图片
      let location = await TreasureMap.decodeAncientScript(clue);
      loadingDiv.style.display = 'none';
      messageDiv.textContent = location;
  
      // 创建并显示下一步按钮
      createNextButton("寻找神庙", () => searchTemple(location));
    }
  
    async function searchTemple(location) {
      loadingDiv.style.display = 'block';
      messageDiv.textContent = '你踏上了前往神庙的旅程，途中充满了危险...';
      storyImage.src = "images/temple_search.jpg"; // 寻找神庙的图片
      try {
        let box = await TreasureMap.searchTemple(location);
        loadingDiv.style.display = 'none';
        messageDiv.textContent = box;
  
        // 创建并显示下一步按钮
        createNextButton("解开谜题", solveTemplePuzzle);
      } catch (error) {
        loadingDiv.style.display = 'none';
        messageDiv.textContent = "任务失败：遇到了神庙守卫!";
        storyImage.src = "images/temple_search.jpg"; // 继续显示寻找神庙的图片
  
        // 显示守卫和失败图片
        const guardContainer = document.getElementById('guard-container');
        guardContainer.style.display = 'block';  // 显示守卫和失败图片
      }
    }
  
    async function solveTemplePuzzle() {
      loadingDiv.style.display = 'block';
      messageDiv.textContent = '你进入了神庙，面前是一个复杂的谜题...';
      storyImage.src = "images/puzzle.jpg"; // 谜题图片
      try {
        let puzzleResult = await TreasureMap.solveTemplePuzzle();
        messageDiv.textContent = puzzleResult;
  
        // 创建并显示下一步按钮
        createNextButton("进入隐藏通道", unlockHiddenPassage);
      } catch (error) {
        loadingDiv.style.display = 'none';
        messageDiv.textContent = '任务失败，谜题解不开!';
        storyImage.src = "images/guard.jpg"; // 神庙守卫图片
      }
    }
  
    async function unlockHiddenPassage() {
      loadingDiv.style.display = 'block';
      messageDiv.textContent = '你解开谜题后，发现了一条隐藏的通道...';
      storyImage.src = "images/hidden_passage.jpg"; // 隐藏通道图片
      let passage = await TreasureMap.unlockHiddenPassage();
      loadingDiv.style.display = 'none';
      messageDiv.textContent = passage;
  
      // 创建并显示下一步按钮
      createNextButton("打开宝藏箱", openTreasureBox);
    }
  
    async function openTreasureBox() {
      loadingDiv.style.display = 'block';
      messageDiv.textContent = '你打开了箱子，里面满是金光闪闪的宝藏...';
      storyImage.src = "images/treasure.jpg"; // 宝藏图片
      let treasure = await TreasureMap.openTreasureBox();
      loadingDiv.style.display = 'none';
      messageDiv.textContent = treasure;
    }
  
    function createNextButton(buttonText, nextStep) {
      // 动态创建按钮
      const nextButton = document.createElement('button');
      nextButton.classList.add('button');
      nextButton.textContent = buttonText;
      nextButton.addEventListener('click', async () => {
        nextButton.remove();  // 移除当前按钮
        await nextStep();     // 执行下一个步骤
      });
      // 在消息区域下方显示按钮
      messageDiv.appendChild(nextButton);
    }
  }
  