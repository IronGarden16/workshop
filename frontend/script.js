const btn = document.getElementById('btn');
const app = document.getElementById('app');

btn.onclick = function () {
  axios.get('http://localhost:3000/posts')
    .then(function (res) {
      console.log(res.data);
      const title = res.data[0].title;
      app.innerText = title;
    });
}
