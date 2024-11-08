// 模拟宝藏地图API
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => setTimeout(() => resolve("在图书馆发现了一张旧地图..."), 1000));
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => setTimeout(() => clue ? resolve("地图上的古老文字显示宝藏位于一座神庙中...") : reject("无法解码古老文字!"), 1500));
  }

  static encounterTempleGuard(location) {
    return new Promise((resolve, reject) => setTimeout(() => Math.random() < 0.8 ? resolve("成功说服守卫让你进入神庙...") : reject("守卫阻止了你进入神庙!"), 2000));
  }

  static solveTemplePuzzle() {
    return new Promise((resolve, reject) => setTimeout(() => Math.random() < 0.9 ? resolve("成功解开神庙的谜题，发现了隐藏的通道!") : reject("解谜失败!你被困在神庙中..."), 1500));
  }

  static enterHiddenPassage() {
    return new Promise((resolve) => setTimeout(() => resolve("你发现了通往宝藏的秘密房间..."), 1500));
  }

  static openTreasureChest() {
    return new Promise((resolve) => setTimeout(() => resolve("恭喜!你找到了传说中的宝藏!"), 1000));
  }
}

// 游戏主逻辑
async function findTreasureWithPromises() {
  const messageDiv = document.getElementById('message');
  const loadingDiv = document.getElementById('loading');
  const storyImage = document.getElementById('story-image');

  function showSceneImage(imageSrc) {
    storyImage.src = imageSrc;
    storyImage.classList.add("scene-image");
    storyImage.style.display = "block";
  }

  // 初始线索
  loadingDiv.style.display = 'block';
  messageDiv.textContent = '你在图书馆里寻找线索...';
  showSceneImage("images/library.jpg");

  let clue = await TreasureMap.getInitialClue();
  loadingDiv.style.display = 'none';
  messageDiv.textContent = clue;
  createNextButton("解码地图上的文字", () => decodeAncientScript(clue));

  async function decodeAncientScript(clue) {
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你开始解码地图上的古老文字...';
    showSceneImage("images/ancient_script.jpg");
    let location = await TreasureMap.decodeAncientScript(clue);
    loadingDiv.style.display = 'none';
    messageDiv.textContent = location;
    createNextButton("前往神庙", () => encounterTempleGuard(location));
  }

  async function encounterTempleGuard(location) {
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你在前往神庙的途中遇到了守卫...';
    
    // 显示神庙背景图片和守卫图片
    showSceneImage("images/temple_search.jpg");
    showGuardImage(); // 在此处始终显示守卫图片并让其左右移动

    try {
      let access = await TreasureMap.encounterTempleGuard(location);
      loadingDiv.style.display = 'none';
      messageDiv.textContent = access;
      createNextButton("进入神庙", solveTemplePuzzle);
    } catch (error) {
      loadingDiv.style.display = 'none';
      messageDiv.textContent = "守卫阻止了你的进入!";
      createNextButton("再次尝试", () => encounterTempleGuard(location));
    }
    
    // 在守卫场景结束后移除守卫图片（无论是否成功）
    removeGuardImage();
  }

  async function solveTemplePuzzle() {
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你进入了神庙，发现一个复杂的谜题...';
    showSceneImage("images/puzzle.jpg");
    try {
      let puzzleSolved = await TreasureMap.solveTemplePuzzle();
      loadingDiv.style.display = 'none';
      messageDiv.textContent = puzzleSolved;
      createNextButton("进入隐藏的通道", enterHiddenPassage);
    } catch (error) {
      loadingDiv.style.display = 'none';
      messageDiv.textContent = '解谜失败，神庙的大门关上了!';
      showSceneImage("images/guard.jpg");
      createNextButton("重新尝试解谜", solveTemplePuzzle);
    }
  }

  async function enterHiddenPassage() {
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你发现了通往宝藏的通道...';
    showSceneImage("images/hidden_passage.jpg");
    let passage = await TreasureMap.enterHiddenPassage();
    loadingDiv.style.display = 'none';
    messageDiv.textContent = passage;
    createNextButton("打开宝藏箱", openTreasureChest);
  }

  async function openTreasureChest() {
    loadingDiv.style.display = 'block';
    messageDiv.textContent = '你找到了宝藏箱...';
    showSceneImage("images/treasure.jpg");
    let treasure = await TreasureMap.openTreasureChest();
    loadingDiv.style.display = 'none';
    messageDiv.textContent = treasure;
  }

  function createNextButton(buttonText, nextStep) {
    const existingButton = document.querySelector(".button");
    if (existingButton) existingButton.remove();

    const nextButton = document.createElement('button');
    nextButton.classList.add('button');
    nextButton.textContent = buttonText;
    nextButton.onclick = async () => {
      nextButton.remove();
      await nextStep();
    };
    document.body.appendChild(nextButton);
  }

  // 显示守卫图片并让其左右移动
  function showGuardImage() {
    // 如果已经存在守卫图片，先移除旧图片
    removeGuardImage();

    const guardImage = document.createElement('img');
    guardImage.src = "images/guard.jpg";
    guardImage.classList.add("guard-image");
    guardImage.id = "guardImage";
    document.getElementById('game-container').appendChild(guardImage);
  }

  // 移除守卫图片
  function removeGuardImage() {
    const guardImage = document.getElementById("guardImage");
    if (guardImage) guardImage.remove();
  }
}

document.getElementById('startBtn').addEventListener('click', async () => {
  document.getElementById('startBtn').style.display = "none";
  await findTreasureWithPromises();
});
