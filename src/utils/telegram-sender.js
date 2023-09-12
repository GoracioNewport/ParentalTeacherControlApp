import Router from '../router'

function sendToAdmin(blob, title) {
  var chat_id = import.meta.env.VITE_TELEGRAM_ID; // replace with yours
  var token = import.meta.env.VITE_TELEGRAM_TOKEN; // from botfather
  var isTest = import.meta.env.VITE_TELEGRAM_TESTING; 

  if (isTest) {
    title = "[TEST] " + title;
  }

  var formData = new FormData();
  formData.append('chat_id', chat_id);
  formData.append('document', blob, title + '.pdf');

  var request = new XMLHttpRequest();
  request.open('POST', `https://api.telegram.org/bot${token}/sendDocument`);
  request.send(formData);

  request.onreadystatechange = function() {
    if (request.readyState == 4) { // `DONE`
      if (request.status == 200) {
        alert("Спасибо, форма отправлена")
        Router.go(0);
      } else {
        alert("Произошла ошибка. Попробуйте отключить AdBlock или зайти в режиме инкогнито.")
      }
    }
  }
}

export { sendToAdmin };