const urlAPI = '/get-prize';
const errMessage = '系統不穩定，請再試一次';

// 拿 API
function getPrize(fn) {
  const request = new XMLHttpRequest();
  request.open('GET', urlAPI, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let result;
      try {
        result = JSON.parse(request.responseText).prize;
      } catch (e) {
        alert(errMessage);
        return;
      }
      fn(result);
    } else {
      alert(errMessage);
    }
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.lottery-info__btn').addEventListener('click', function(){
    getPrize((prize) => {
      const container = document.querySelector('.free-prize-content');
      container.querySelector('.free-prize-content-notice').classList.add('hide');
      container.style.cssText = `background-image: linear-gradient(rgba(0, 0 , 0, 0.5), rgba(0, 0 , 0, 0.5)), url(${prize.url});`
     
      const div = document.createElement('div');
      div.classList.add('lottery-result');
      div.innerHTML = `
        <h2 class="lottery-result__title">${prize.title}</h2>
        <h3 class="lottery-result__content">${prize.content}</h3>  
        <button class="lottery-result__btn" onclick="javascript: window.location.reload()">再抽一次</button>
      `;
      container.appendChild(div);
    })
  })
})