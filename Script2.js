

// ========== ТЕКУЩИЙ ГОД ==========
let yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    function updateCartUI() {
        const countSpan = document.querySelector('.cart-count');
        const listContainer = document.getElementById('cart-list');
        const totalSpan = document.getElementById('cart-total');

        if (countSpan) countSpan.textContent = cart.length;

        if (listContainer) {
            if (cart.length === 0) {
                listContainer.innerHTML = '<p style="text-align:center; padding:10px;">Корзина пуста</p>';
                totalSpan.textContent = '0';
            } else {
                let html = '';
                let total = 0;
                // Добавляем индекс (i), чтобы знать, какой именно товар удалять
                cart.forEach((item, i) => {
                    html += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px id='item-${i}' solid #f0f0f0; padding-bottom:5px;">
                        <div style="flex:1;">
                            <div style="font-size:14px; font-weight:bold;">${item.name}</div>
                            <div style="font-size:12px; color:#E5989B;">${item.price} ₽</div>
                        </div>
                        <button class="delete-item" data-index="${i}" style="background:none; border:none; color:red; cursor:pointer; font-size:18px; padding:0 5px;">&times;</button>
                    </div>`;
                    total += item.price;
                });
                listContainer.innerHTML = html;
                totalSpan.textContent = total;
            }
        }
    }

    document.addEventListener('click', (e) => {
        // Добавление в корзину
        if (e.target.classList.contains('add-to-cart')) {
            const card = e.target.closest('.product');
            const name = card.querySelector('h3').textContent;
            const price = parseInt(card.querySelector('.price').textContent.replace(/\D/g, ''));

            cart.push({ name, price });
            localStorage.setItem('myCart', JSON.stringify(cart));
            updateCartUI();
        }

        // УДАЛЕНИЕ из корзины (по кнопке "крестик")
        if (e.target.classList.contains('delete-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Удаляем 1 элемент по индексу
            localStorage.setItem('myCart', JSON.stringify(cart));
            updateCartUI();
        }

        // Открытие/Закрытие модалки
        if (e.target.classList.contains('cart-icon') || e.target.closest('.cart-icon')) {
            const modal = document.getElementById('cart-modal');
            if (modal) {
                modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
                updateCartUI();
            }
        }
    });

    updateCartUI();
});
function calculateCandle() {
    // Получаем данные из полей
    const volume = parseFloat(document.getElementById('vol').value) || 0;
    const quantity = parseInt(document.getElementById('qty').value) || 0;

    // Плотность соевого воска ~0.86 (100мл объема = 86г воска)
    const totalWax = Math.round(volume * quantity * 0.86);

    // Показываем результат
    const resultDiv = document.getElementById('res');
    const waxSpan = document.getElementById('wax-sum');

    if (totalWax > 0) {
        resultDiv.style.display = 'block';
        waxSpan.innerText = totalWax;
    } else {
        alert("Пожалуйста, введите корректные числа");
    }
}