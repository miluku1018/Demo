
const apiURL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
// 抽獎， 如果有錯誤就會放在第一個參數，如果沒有錯誤就會把資料放在第二個參數
function getPrize(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', apiURL, true);
  request.addEventListener('load', function() {
    const response = request.responseText;
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(response);
      } catch(err) {
        callback(errorMessage);
        return;
      }
      if (!data.prize) {
        callback(errorMessage);
        return;
      }
      // null 沒有錯誤， data 回傳
      callback(null, data) 
    } else {
      callback(errorMessage);
    }
  })
  request.onerror = function() {
    callback(errorMessage);
        return;
  }
  request.send();
}

document.querySelector('.free-prize').addEventListener('click', () => {
  // call API 抽獎
  getPrize(function(err, data){
    // 如果有錯誤，就會跳出通知，return 終止執行
    if (err) {
      alert(err);
      return
    }
    // 如果沒有錯誤，就會執行以下畫面顯示
    const container = document.querySelector('.free-prize');
    const prize = data.prize;
  
    if (prize === 'FIRST') {
      document.querySelector('.free-prize').removeChild(document.querySelector('.free-prize-content'));
      const newFreePrize = document.createElement('div')
      newFreePrize.classList.add('free-prize-content')
      newFreePrize.classList.add('first')
      newFreePrize.innerHTML = `    
        <h2 class="free-prize-title">恭喜你中頭獎了！日本東京來回雙人遊！</h2>
        <button class="btn">我要抽獎</button>`
      container.appendChild(newFreePrize);
      } else if (prize === 'SECOND') {
        document.querySelector('.free-prize').removeChild(document.querySelector('.free-prize-content'))
        const newFreePrize = document.createElement('div')
        newFreePrize.classList.add('free-prize-content')
        newFreePrize.classList.add('second')
        newFreePrize.innerHTML = `    
          <h2 class="free-prize-title">二獎！90 吋電視一台！</h2>
          <button class="btn">我要抽獎</button>`
          container.appendChild(newFreePrize);
      } else if (prize === 'THIRD') {
        document.querySelector('.free-prize').removeChild(document.querySelector('.free-prize-content'))
        const newFreePrize = document.createElement('div')
        newFreePrize.classList.add('free-prize-content')
        newFreePrize.classList.add('third')
        newFreePrize.innerHTML = `    
          <h2 class="free-prize-title">恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</h2>
          <button class="btn">我要抽獎</button>`
          container.appendChild(newFreePrize);
      } else if (prize === 'NONE') {
        document.querySelector('.free-prize').removeChild(document.querySelector('.free-prize-content'))
        const newFreePrize = document.createElement('div')
        newFreePrize.classList.add('free-prize-content')
        newFreePrize.classList.add('none')
        newFreePrize.innerHTML = `    
          <h2 class="free-prize-title">銘謝惠顧</h2>
          <button class="btn">我要抽獎</button>`
          container.appendChild(newFreePrize);
      }
  })
})