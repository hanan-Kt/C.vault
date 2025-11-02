document.addEventListener('DOMContentLoaded', () => {
    
    const countrySelectButton = document.getElementById('countrySelectButton');
    const countryDropdown = document.getElementById('countryDropdown');
    const countrySearchInput = document.getElementById('countrySearchInput');
    const countryList = document.getElementById('countryList');
    const selectedCountryDisplay = document.getElementById('selectedCountryDisplay');
    const dropdownIcon = document.getElementById('dropdownIcon');

    const countries = [
        { name: "Palestine", code: "PS", flag: "🇵🇸" },
        { name: "Jordan", code: "JO", flag: "🇯🇴" },
        { name: "Lebanon", code: "LB", flag: "🇱🇧" },
        { name: "Syria", code: "SY", flag: "🇸🇾" },
        { name: "Egypt", code: "EG", flag: "🇪🇬" },
        { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
        { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
        { name: "Qatar", code: "QA", flag: "🇶🇦" },
        { name: "Kuwait", code: "KW", flag: "🇰🇼" },
        { name: "Bahrain", code: "BH", flag: "🇧🇭" },
        { name: "Oman", code: "OM", flag: "🇴🇲" },
        { name: "Iraq", code: "IQ", flag: "🇮🇶" },
        { name: "Turkey", code: "TR", flag: "🇹🇷" },
        { name: "Morocco", code: "MA", flag: "🇲🇦" },
        { name: "Algeria", code: "DZ", flag: "🇩🇿" },
        { name: "Tunisia", code: "TN", flag: "🇹🇳" },
        { name: "Libya", code: "LY", flag: "🇱🇾" },
        { name: "Yemen", code: "YE", flag: "🇾🇪" },
        
        { name: "United States", code: "US", flag: "🇺🇸" },
        { name: "Canada", code: "CA", flag: "🇨🇦" },
        { name: "Mexico", code: "MX", flag: "🇲🇽" },
        
        { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
        { name: "France", code: "FR", flag: "🇫🇷" },
        { name: "Germany", code: "DE", flag: "🇩🇪" },
        { name: "Italy", code: "IT", flag: "🇮🇹" },
        { name: "Spain", code: "ES", flag: "🇪🇸" },
        { name: "Netherlands", code: "NL", flag: "🇳🇱" },
        { name: "Sweden", code: "SE", flag: "🇸🇪" },
        { name: "Norway", code: "NO", flag: "🇳🇴" },
        { name: "Switzerland", code: "CH", flag: "🇨🇭" },
        { name: "Poland", code: "PL", flag: "🇵🇱" },
        { name: "Greece", code: "GR", flag: "🇬🇷" },
        { name: "Russia", code: "RU", flag: "🇷🇺" },

        { name: "China", code: "CN", flag: "🇨🇳" },
        { name: "Japan", code: "JP", flag: "🇯🇵" },
        { name: "South Korea", code: "KR", flag: "🇰🇷" },
        { name: "India", code: "IN", flag: "🇮🇳" },
        { name: "Australia", code: "AU", flag: "🇦🇺" },
        { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Thailand", code: "TH", flag: "🇹🇭" },
        { name: "Indonesia", code: "ID", flag: "🇮🇩" },
        { name: "Philippines", code: "PH", flag: "🇵🇭" },
        { name: "Pakistan", code: "PK", flag: "🇵🇰" },
        { name: "Bangladesh", code: "BD", flag: "🇧🇩" },

        { name: "South Africa", code: "ZA", flag: "🇿🇦" },
        { name: "Nigeria", code: "NG", flag: "🇳🇬" },
        { name: "Kenya", code: "KE", flag: "🇰🇪" },
        
        { name: "Brazil", code: "BR", flag: "🇧🇷" },
        { name: "Argentina", code: "AR", flag: "🇦🇷" },
        { name: "Chile", code: "CL", flag: "🇨🇱" },
        { name: "Colombia", code: "CO", flag: "🇨🇴" },
        { name: "Peru", code: "PE", flag: "🇵🇪" },
        
        { name: "Vietnam", code: "VN", flag: "🇻🇳" },
        { name: "Portugal", code: "PT", flag: "🇵🇹" },
        { name: "Ireland", code: "IE", flag: "🇮🇪" },
        { name: "Finland", code: "FI", flag: "🇫🇮" },
        { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
        { name: "Hong Kong", code: "HK", flag: "🇭🇰" }
    ];

    let selectedCountry = { name: "United States", code: "US", flag: "🇺🇸" };
    
    function updateCountryDisplay() {
        selectedCountryDisplay.textContent = `${selectedCountry.flag} ${selectedCountry.name}`;
    }
    
    function toggleCountryDropdown() {
        countryDropdown.classList.toggle('hidden');
        dropdownIcon.classList.toggle('fa-chevron-up');
        dropdownIcon.classList.toggle('fa-chevron-down');
    }

    function renderCountryList(filter = '') {
        countryList.innerHTML = '';
        const filteredCountries = countries.filter(country => 
            country.name.toLowerCase().includes(filter.toLowerCase())
        ).sort((a, b) => a.name.localeCompare(b.name));

        if (filteredCountries.length === 0) {
            countryList.innerHTML = '<div class="no-results-message">No countries found.</div>';
            return;
        }

        filteredCountries.forEach(country => {
            const item = document.createElement('div');
            item.classList.add('country-list-item');
            item.innerHTML = `
                <span class="country-flag">${country.flag}</span>
                <span class="country-name-text">${country.name}</span>
            `;
            item.addEventListener('click', () => {
                selectedCountry = country;
                updateCountryDisplay();
                toggleCountryDropdown();
                countrySearchInput.value = ''; 
                renderCountryList();
            });
            countryList.appendChild(item);
        });
    }

    countrySelectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCountryDropdown();
        renderCountryList();
    });

    countrySearchInput.addEventListener('input', (e) => {
        renderCountryList(e.target.value);
    });

    document.addEventListener('click', (e) => {
        if (!countrySelectButton.contains(e.target) && !countryDropdown.contains(e.target) && !countryDropdown.classList.contains('hidden')) {
            countryDropdown.classList.add('hidden');
            dropdownIcon.classList.remove('fa-chevron-up');
            dropdownIcon.classList.add('fa-chevron-down');
            countrySearchInput.value = ''; 
            renderCountryList();
        }
    });

    updateCountryDisplay();
    renderCountryList();


    const signInButton = document.getElementById('signInButton');
    const signInDropdown = document.getElementById('signInDropdown');
    const signInDropdownIcon = document.getElementById('signInDropdownIcon');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const dropdownOptions = document.querySelectorAll('.sign-in-option');

    function toggleSignInDropdown() {
        signInDropdown.classList.toggle('hidden');
        signInDropdownIcon.classList.toggle('fa-chevron-up');
        signInDropdownIcon.classList.toggle('fa-chevron-down');
    }

    signInButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSignInDropdown();
    });
    
    document.addEventListener('click', (e) => {
        if (!signInButton.contains(e.target) && !signInDropdown.contains(e.target) && !signInDropdown.classList.contains('hidden')) {
            toggleSignInDropdown();
        }
    });

    dropdownOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            toggleSignInDropdown(); 

            if (action === 'login') {
                loginModal.classList.remove('hidden');
            } else if (action === 'register') {
                registerModal.classList.remove('hidden');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.add('hidden');
        });
    });

    [loginModal, registerModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.add('hidden');
            }
        });
    });

    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const totalItems = document.querySelectorAll('.carousel-item').length;
    let currentIndex = 0;
    let slideInterval;

    function updateCarousel() {
        const slidePercentage = (currentIndex * 100);
        carouselInner.style.transform = `translateX(-${slidePercentage}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        goToPrev();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        goToNext();
        resetAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        slideInterval = setInterval(goToNext, 5000); 
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    startAutoSlide();


    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const buyNowButton = document.getElementById('buyNowButton');

    let cartItems = []; 
    

    function toggleCartSidebar() {
        cartSidebar.classList.toggle('hidden');
    }

    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotal.textContent = `$${total.toFixed(2)}`;
        
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        
        if (cartItems.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            buyNowButton.disabled = true;
            buyNowButton.textContent = 'Add Something to Cart';
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            buyNowButton.disabled = false;
            buyNowButton.textContent = 'Buy Now';
        }
    }

    function handleQuantityChange(id, change) {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                deleteCartItem(id);
            }
        }
        renderCart();
    }

    function deleteCartItem(id) {
        cartItems = cartItems.filter(i => i.id !== id);
        renderCart();
    }

    function renderCart() {
        cartItemsWrapper.querySelectorAll('.cart-item').forEach(el => el.remove());

        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                            <button class="delete-item-btn" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsWrapper.appendChild(itemElement);
            });
            cartItemsWrapper.querySelectorAll('.plus-btn').forEach(btn => {
                btn.addEventListener('click', (e) => handleQuantityChange(parseInt(e.currentTarget.dataset.id), 1));
            });
            cartItemsWrapper.querySelectorAll('.minus-btn').forEach(btn => {
                btn.addEventListener('click', (e) => handleQuantityChange(parseInt(e.currentTarget.dataset.id), -1));
            });
            cartItemsWrapper.querySelectorAll('.delete-item-btn').forEach(btn => {
                btn.addEventListener('click', (e) => deleteCartItem(parseInt(e.currentTarget.dataset.id)));
            });
        }
        updateCartTotal();
    }
    
    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCartSidebar();
    });

    closeCartButton.addEventListener('click', () => {
        toggleCartSidebar();
    });

    cartSidebar.addEventListener('click', (e) => {
        if (e.target.classList.contains('sidebar-overlay')) {
            toggleCartSidebar();
        }
    });
    
    renderCart();

    const openChatButton = document.getElementById('openChatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChatButton = document.getElementById('closeChatButton');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatButton = document.getElementById('sendChatButton');

    function toggleChatBox() {
        chatBox.classList.toggle('hidden');
        if (!chatBox.classList.contains('hidden')) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function createMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let tickIcons = '';
        if (type === 'sent') {
            const tickStatus = Math.floor(Math.random() * 3);
            
            let tickColor = '';
            let tickCount = 1;
            
            if (tickStatus === 1) {
                tickCount = 2;
            } else if (tickStatus === 2) {
                tickCount = 2;
                tickColor = ' blue';
            }
            
            for (let i = 0; i < tickCount; i++) {
                if (i === 1) {
                    tickIcons += `<i class="fas fa-check${tickColor}"></i>`;
                } else {
                    tickIcons += `<i class="fas fa-check"></i>`;
                }
            }

        }

        messageElement.innerHTML = `
            <p>${text}</p>
            <div class="timestamp">
                ${timeString} 
                ${tickIcons}
            </div>
        `;
        
        return messageElement;
    }
    
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        const sentMessage = createMessage(text, 'sent');
        chatMessages.appendChild(sentMessage);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const replyText = "Thank you for your message! A support agent will be with you shortly.";
            const receivedMessage = createMessage(replyText, 'received');
            chatMessages.appendChild(receivedMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500); 
    }

    openChatButton.addEventListener('click', toggleChatBox);
    closeChatButton.addEventListener('click', toggleChatBox);

    sendChatButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    });

    const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
