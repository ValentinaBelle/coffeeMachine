 <script>
      let money = document.getElementById("money");
      let display = document.getElementById("display");
      let test = document.getElementById("test");
      let bills = document.querySelectorAll("img[src$='rub.jpg']");
      let bill_acc = document.querySelector("img[src$='bill_acc.jpg']");
      let balance = document.getElementById("balance");

      for (bill of bills) {
        bill.onmousedown = function (e) {
          bill = e.currentTarget;
          bill.style.position = "absolute";
          bill.style.zIndex = 1000;
          bill.style.transform = "rotate(90deg)";

          document.addEventListener("mousemove", moveAt);

          bill.onmouseup = function () {
            document.removeEventListener("mousemove", moveAt);
            bill.style.zIndex = 1;

            let bill_top = bill.getBoundingClientRect().top;
            let bill_left = bill.getBoundingClientRect().left;
            let bill_right = bill.getBoundingClientRect().right;

            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let bill_acc_bottom =
              bill_acc.getBoundingClientRect().bottom -
              (bill_acc.getBoundingClientRect().height / 3) * 2;

            if (
              bill_top > bill_acc_top &&
              bill_left > bill_acc_left &&
              bill_right < bill_acc_right &&
              bill_top < bill_acc_bottom
            ) {
              //bill.hidden = true;
              bill.classList.add("animated");
              setTimeout(function () {
                bill.hidden = true;
              }, 800);
              money.value = +money.value + +bill.dataset.billValue;
              balance.innerHTML = `<i class="fa-solid fa-piggy-bank"></i> Баланс: ${money.value} руб.`;
            }
          };

          function moveAt(event) {
            let x = event.clientX - 148;
            let y = event.clientY - 62;
            bill.style.top = y + "px";
            bill.style.left = x + "px";
          }

          //Отключаем стандартное поведение браузера при Drag&Drop
          bill.ondragstart = function () {
            return false;
          };
        };
      }

      function getCoffee(price, name) {
        if (money.value >= price) {
          money.value = money.value - price;
          startProgressBar(name);
          balance.innerHTML = `<i class="fa-solid fa-piggy-bank"></i> Баланс: ${money.value} руб.`;
          //console.log(name + " готов!");
        } else {
          displayInfo.innerHTML = "Для покупки " + name + " мало средств(";
        }
      }

      function startProgressBar(coffeeName) {
        let i = 0;
        let progressBar = document.querySelector(".progress-bar");
        progressBar.parentElement.hidden = false;

        displayInfo.innerHTML = `<i class="fa-solid fa-hourglass fa-spin"></i>&nbsp;&nbsp; Ваш ${coffeeName} готовится...`;
        function progress() {
          i++;
          progressBar.style.width = i + "%";
          if (i == 100) {
            clearInterval(timerId);
            progressBar.style.width = 0 + "%";
            progressBar.parentElement.hidden = true;
            displayInfo.innerHTML = coffeeName + " готов! Заберите напиток.";
          } else if (i == 50) {
            displayInfo.innerHTML = `<i class="fa-solid fa-hourglass-end fa-spin"></i>&nbsp;&nbsp; Ваш ${coffeeName} почти готов...`;
          }
        }
        let timerId = setInterval(progress, 100);
      }

      function getChange(num) {
        let coin;
        let top = getRandom(0, changeBox.getBoundingClientRect().height - 75);
        let left = getRandom(0, changeBox.getBoundingClientRect().width - 75);
        if (num >= 10) coin = 10;
        else if (num >= 5) coin = 5;
        else if (num >= 2) coin = 2;
        else if (num >= 1) coin = 1;
        console.log(coin);
        if (num <= 0) {
          return;
        }
        changeBox.innerHTML += `<img src="${coin}rub.png" style="top:${top}px; left:${left}px" onclick="this.style.display = 'none'">`;
        balance.innerHTML = `<i class="fa-solid fa-piggy-bank"></i> Баланс: 0 руб.`;
        if (num - coin !== 0) {
          getChange(num - coin);
        }
      }
      function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
</script>
