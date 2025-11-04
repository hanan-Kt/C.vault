document.addEventListener('DOMContentLoaded', () => {

    // ========================================================================= 
    // --- MAIN PAGE & GLOBAL HEADER LOGIC START ---
    // ========================================================================= 
    
    // --- Global Header Elements (Country Selector) ---
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
    
    // Check if the required elements exist before adding listeners (Safe for multiple pages)
    if (countrySelectButton) {
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
                // Note: The original flags were mojibake, I've corrected them here using standard unicode emojis.
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
    }


    // --- Global Header Elements (Sign In/Modal Logic) ---
    const signInButton = document.getElementById('signInButton');
    const signInDropdown = document.getElementById('signInDropdown');
    const signInDropdownIcon = document.getElementById('signInDropdownIcon');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const dropdownOptions = document.querySelectorAll('.sign-in-option');

    if (signInButton) {
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
            if (signInDropdown && !signInButton.contains(e.target) && !signInDropdown.contains(e.target) && !signInDropdown.classList.contains('hidden')) {
                toggleSignInDropdown();
            }
        });

        dropdownOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                toggleSignInDropdown(); 

                if (action === 'login' && loginModal) {
                    loginModal.classList.remove('hidden');
                } else if (action === 'register' && registerModal) {
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
            if(modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal-overlay')) {
                        e.target.classList.add('hidden');
                    }
                });
            }
        });
    }

    // --- Main Page Specific (Carousel Logic) ---
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
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
    }


    // --- Global Floating Elements (Cart Sidebar) ---
    // Note: This logic must run on all pages where the cart button is present.
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const buyNowButton = document.getElementById('buyNowButton');

    let cartItems = [ 
        // Example Item (for demonstration, remove this line for a truly empty cart)
        // { id: 1, name: "Winter Jacket", price: 120.00, quantity: 1, image: "placeholder.jpg" }
    ]; 
    

    function toggleCartSidebar() {
        if(cartSidebar) {
            cartSidebar.classList.toggle('hidden');
        }
    }

    function updateCartTotal() {
        if (!cartSubtotal || !cartItemsWrapper) return;
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotal.textContent = `$${total.toFixed(2)}`;
        
        let emptyCartMessage = document.getElementById('emptyCartMessage');
        
        if (cartItems.length === 0) {
            if (!emptyCartMessage) {
                 emptyCartMessage = document.createElement('div');
                 emptyCartMessage.id = 'emptyCartMessage';
                 emptyCartMessage.classList.add('empty-cart-message');
                 emptyCartMessage.innerHTML = '<p>Your cart is currently empty.</p>';
                 cartItemsWrapper.appendChild(emptyCartMessage);
            }
            emptyCartMessage.style.display = 'block';
            if (buyNowButton) {
                buyNowButton.disabled = true;
                buyNowButton.textContent = 'Add Something to Cart';
            }
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            if (buyNowButton) {
                buyNowButton.disabled = false;
                buyNowButton.textContent = 'Buy Now';
            }
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
        if (!cartItemsWrapper) return;

        // Clear existing items but keep the empty message wrapper if it exists
        cartItemsWrapper.querySelectorAll('.cart-item').forEach(el => el.remove());

        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="cart-item-image">
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
            
            // Re-attach event listeners to new buttons
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
    
    // FIX: Listener attached to the Cart Button (present on both pages)
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartSidebar();
        });
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            toggleCartSidebar();
        });
    }

    if (cartSidebar) {
        cartSidebar.addEventListener('click', (e) => {
            if (e.target.classList.contains('sidebar-overlay')) {
                toggleCartSidebar();
            }
        });
    }
    
    renderCart();


    // --- Global Floating Elements (Chat Window) ---
    // Note: This logic must run on all pages where the chat button is present.
    const openChatButton = document.getElementById('openChatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChatButton = document.getElementById('closeChatButton');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatButton = document.getElementById('sendChatButton');

    function toggleChatBox() {
        if (chatBox) {
            chatBox.classList.toggle('hidden');
            if (!chatBox.classList.contains('hidden')) {
                // Scroll to bottom when opening
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
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
            
            if (tickStatus === 1) { // Delivered
                tickCount = 2;
            } else if (tickStatus === 2) { // Read
                tickCount = 2;
                tickColor = ' blue';
            }
            
            // Simplified tick rendering: assume only one element exists if we can't style two checks separately easily
            tickIcons = `<i class="fas fa-check${tickColor}"></i>`;
            if (tickCount === 2) {
                tickIcons += `<i class="fas fa-check${tickColor}"></i>`;
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
        if (!chatInput || !chatMessages) return;

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

    // FIX: Listener attached to the Chat Button (present on both pages)
    if (openChatButton) {
        openChatButton.addEventListener('click', toggleChatBox);
    }
    if (closeChatButton) {
        closeChatButton.addEventListener('click', toggleChatBox);
    }

    if (sendChatButton) {
        sendChatButton.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
                e.preventDefault();
            }
        });
    }


    // =========================================================================
    // --- MAIN PAGE & GLOBAL HEADER LOGIC END ---
    // --- PRODUCT LISTING PAGE (PLP) LOGIC START ---
    // =========================================================================

    // 1. Filter Dropdowns Toggle Logic (Handles 'SORT BY' and others)
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');

    filterDropdowns.forEach(dropdown => {
        const label = dropdown.querySelector('.dropdown-label');
        const content = dropdown.querySelector('.dropdown-content');
        const icon = dropdown.querySelector('.dropdown-label i');

        if (label && content && icon) {
            label.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close all other open dropdowns
                filterDropdowns.forEach(otherDropdown => {
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    const otherIcon = otherDropdown.querySelector('.dropdown-label i');
                    
                    if (otherDropdown !== dropdown && otherContent && otherIcon) {
                        otherContent.classList.add('hidden');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle the clicked dropdown
                content.classList.toggle('hidden');
                
                // Rotate the icon
                if (!content.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });

    // Close filter dropdowns if user clicks anywhere else on the document
    if (filterDropdowns.length > 0) {
        document.addEventListener('click', (e) => {
            filterDropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                const icon = dropdown.querySelector('.dropdown-label i');
                
                if (content && icon) {
                    if (!dropdown.contains(e.target) && !content.classList.contains('hidden')) {
                        content.classList.add('hidden');
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }


    // 2. Wishlist Button Functionality
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const heartIcon = button.querySelector('i');
            
            if (heartIcon) {
                // Toggle the icon between solid and regular heart
                if (heartIcon.classList.contains('far')) {
                    // Not yet in wishlist, so add it
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    heartIcon.style.color = 'red'; 
                    console.log("Item added to wishlist!");
                } else {
                    // Already in wishlist, so remove it
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    heartIcon.style.color = ''; 
                    console.log("Item removed from wishlist.");
                }
            }
        });
    });

    // 3. Pagination (Simulated)
    const paginationLinks = document.querySelectorAll('.new-in-pagination .page-link');

    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simple active state toggle (for visual feedback only)
            paginationLinks.forEach(l => l.classList.remove('active'));
            if (!link.classList.contains('disabled')) {
                link.classList.add('active');
                console.log(`Navigating to page: ${link.textContent.trim()}`);
            }
        });
    });

    
    
    // 4. Placeholder for Add to Cart on PLP (Future implementation point)
    /*
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({...product, quantity: 1});
        }
        renderCart();
        toggleCartSidebar(); // Open cart on addition
        console.log(`Added ${product.name} to cart.`);
    }

    const addToCartButtons = document.querySelectorAll('.add-to-bag-btn'); // Assuming a button with this class
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Placeholder product data - replace with data from HTML data attributes
            const productId = parseInt(button.closest('.product-item').dataset.id); 
            const productName = button.closest('.product-item').querySelector('.product-name').textContent; 
            const productPrice = parseFloat(button.closest('.product-item').dataset.price); 
            
            // addToCart({ id: productId, name: productName, price: productPrice, image: '...' });
        });
    });
    */

    // =========================================================================
    // --- PRODUCT LISTING PAGE (PLP) LOGIC END ---
    // =========================================================================

});