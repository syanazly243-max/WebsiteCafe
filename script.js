let orderList = JSON.parse(localStorage.getItem('currentOrder')) || [];

function updateOrderUI(){
    let orderUl = document.getElementById('orderList');
    let totalEl = document.getElementById('total');
    if(orderUl){
        orderUl.innerHTML = '';
        let total = 0;
        orderList.forEach((item, idx)=>{
            total += item.price;
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `${item.name} - RM ${item.price.toFixed(2)} <button class="btn btn-sm btn-danger remove-btn" data-idx="${idx}">Remove</button>`;
            orderUl.appendChild(li);
        });
        if(totalEl) totalEl.innerText = total.toFixed(2);

        document.querySelectorAll('.remove-btn').forEach(btn=>{
            btn.addEventListener('click', function(){
                let index = parseInt(this.dataset.idx);
                orderList.splice(index,1);
                localStorage.setItem('currentOrder', JSON.stringify(orderList));
                updateOrderUI();
            });
        });
    }
}

// Add item buttons
document.querySelectorAll('.add-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
        orderList.push({name: this.dataset.name, price: parseFloat(this.dataset.price)});
        localStorage.setItem('currentOrder', JSON.stringify(orderList));
        updateOrderUI();
    });
});
updateOrderUI();

// ===== Payment Choice Page =====
const paymentOrderList = document.getElementById('paymentOrderList');
const paymentTotal = document.getElementById('paymentTotal');
if(paymentOrderList){
    let total = 0;
    paymentOrderList.innerHTML = '';
    orderList.forEach(item=>{
        total += item.price;
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = `${item.name} - RM ${item.price.toFixed(2)}`;
        paymentOrderList.appendChild(li);
    });
    paymentTotal.innerText = total.toFixed(2);

    // Dine In / Pickup
    const dineBtn = document.getElementById('dineBtn');
    const pickupBtn = document.getElementById('pickupBtn');
    const tableDiv = document.getElementById('tableSelectDiv');
    const confirmDineBtn = document.getElementById('confirmDineBtn');

    if(dineBtn) dineBtn.addEventListener('click', ()=> tableDiv.classList.remove('d-none'));
    if(pickupBtn) pickupBtn.addEventListener('click', ()=> window.location.href='payment.html');

    if(confirmDineBtn){
        confirmDineBtn.addEventListener('click', ()=>{
            let table = document.getElementById('tableNumber').value;
            if(table) window.location.href='payment.html';
            else alert("Please select a table number!");
        });
    }
}

// ===== Final Payment Page =====
const finalOrderList = document.getElementById('finalOrderList');
const finalTotal = document.getElementById('finalTotal');
const payBtn = document.getElementById('payBtn');

if(finalOrderList){
    let total = 0;
    finalOrderList.innerHTML = '';
    orderList.forEach(item=>{
        total += item.price;
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = `${item.name} - RM ${item.price.toFixed(2)}`;
        finalOrderList.appendChild(li);
    });
    finalTotal.innerText = total.toFixed(2);

    if(payBtn){
        payBtn.addEventListener('click', ()=>{
            const selected = document.querySelector('input[name="paymentMethod"]:checked');
            if(!selected){
                alert("Please select a payment method!");
                return;
            }
            alert(`Payment Successful!\nMethod: ${selected.value}\nTotal Paid: RM ${total.toFixed(2)}`);
            localStorage.removeItem('currentOrder');
            orderList = [];
            window.location.href='index.html';
        });
    }
}
