"use strict"

// Стандартная проверка того, что документ уже загружен
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        // let error = 0;
        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {

            form.classList.add('_sending');

            let list = document.querySelector('.cards__container');

            list.innerHTML += `
              <div class="card__column">
                  <div class="cards__body">
                      <div class="cards__title">${form.name.value}</div>
                      <div class="cards__email">${form.mail.value}</div>
                      <div class="cards__text">${form.comment.value}</div>
                  </div>
              </div>
            `
        } else {
            alert('Заполните обязательные поля!')
            form.classList.remove('_sending');
        }
        form.reset();
    }

    function formValidate(form) {

        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            formRemoveError(input);

            if (input.classList.contains('_email')) {

                if (emailTest(input)) {

                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        // Добавляем родительскому объекту класс error
        input.parentElement.classList.add('_error');
        // Добавляем самому объекту класс error
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        // Удаляем с родителя объекта класс error
        input.parentElement.classList.remove('_error');
        // Удаляем с объекта класс error
        input.classList.remove('_error');
    }

    // Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});