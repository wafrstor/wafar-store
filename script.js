let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');
    if (pageId === 'cart') updateCartDisplay();
    if (pageId === 'home') updateCartCount();
}

function addToCart(cp, price) {
    const existing = cart.find(item => item.cp === cp);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ cp, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('تم إضافة ' + cp + ' CP للسلة!');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;">السلة فارغة</p>';
        document.getElementById('checkout-btn').style.display = 'none';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.cp} CP</strong><br>
                    السعر: ${item.price} ريال × ${item.quantity}
                </div>
                <div style="font-weight:bold; color:#10b981;">
                    ${itemTotal} ريال
                </div>
            </div>
        `;
    });
    html += `<div style="margin-top:2rem; font-size:1.5rem; font-weight:bold; text-align:center;">
        الإجمالي: ${total.toFixed(2)} ريال
    </div>`;
    container.innerHTML = html;
    document.getElementById('checkout-btn').style.display = 'block';
}

function continueShopping() {
    showPage('home');
}

function showCheckout() {
    showPage('checkout');
    // إظهار معلومات البنك حسب الطريقة لكن بسيط
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const playerId = document.getElementById('player-id').value;
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment-method').value;
    if (!playerId || !name || !phone || !payment) {
        alert('يرجى ملء جميع البيانات');
        return;
    }
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`✅ تم تسجيل طلبك!\nايدي: ${playerId}\nالاسم: ${name}\nالرقم: ${phone}\nالدفع: ${payment === 'bank' ? 'تحويل بنكي' : 'Apple Pay'}\nالإجمالي: ${total} ريال\n\nأرسل الإيصال على الواتس أو الإيميل للشحن الفوري!`);
    cart = [];
    localStorage.removeItem('cart');
    showPage('home');
    updateCartCount();
});

// تحديث العداد عند التحميل
updateCartCount();
