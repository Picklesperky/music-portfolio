document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quantityMinusBtns = document.querySelectorAll('.quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeBtns = document.querySelectorAll('.remove-btn');
    const updateCartBtn = document.querySelector('.update-cart');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Quantity controls
    quantityMinusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateSubtotal(input);
            }
        });
    });
    
    quantityPlusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updateSubtotal(input);
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (parseInt(input.value) < 1) input.value = 1;
            updateSubtotal(input);
        });
    });
    
    // Update subtotal for an item
    function updateSubtotal(input) {
        const cartItem = input.closest('.cart-item');
        const priceText = cartItem.querySelector('.price .current-price').textContent;
        const price = parseInt(priceText.replace('KSh', '').replace(/,/g, '').trim());
        const quantity = parseInt(input.value);
        const subtotal = price * quantity;
        
        cartItem.querySelector('.subtotal').textContent = `KSh ${subtotal.toLocaleString()}`;
        updateCartSummary();
    }
    
    // Remove item from cart
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.cart-item').remove();
            updateCartSummary();
        });
    });
    
    // Update cart summary
    function updateCartSummary() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const subtotalText = item.querySelector('.subtotal').textContent;
            subtotal += parseInt(subtotalText.replace('KSh', '').replace(/,/g, '').trim());
        });
        
        const deliveryFee = 250;
        const discount = 1500;
        const total = subtotal + deliveryFee - discount;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `KSh ${subtotal.toLocaleString()}`;
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `KSh ${deliveryFee.toLocaleString()}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `-KSh ${discount.toLocaleString()}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `KSh ${total.toLocaleString()}`;
        
        // Update cart count in header
        const totalItems = Array.from(cartItems).reduce((sum, item) => {
            return sum + parseInt(item.querySelector('.quantity-input').value);
        }, 0);
        
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = totalItems;
        });
    }
    
    // Update cart button
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', () => {
            // In a real app, this would send an AJAX request to update the cart on the server
            alert('Cart updated successfully!');
        });
    }
    
    // Continue shopping button
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
    
    // Initialize cart summary
    updateCartSummary();
});