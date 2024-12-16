
// Menü fonksiyonu
function toggleMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Alt menü fonksiyonu
function toggleSubmenu(event) {
    event.preventDefault();
    event.stopPropagation();
    const submenu = document.getElementById('submenu');
    const faaliyetlerLink = event.currentTarget;
    
    submenu.classList.toggle('active');
    faaliyetlerLink.classList.toggle('active');
    
    // Alt menünün konumunu ayarla
    const rect = faaliyetlerLink.getBoundingClientRect();
    
    if (window.innerWidth > 768) {
        // Desktop view: position below the Faaliyetler link
        submenu.style.top = `${rect.bottom}px`;
        submenu.style.left = `${rect.left}px`;
    } else {
        // Mobile view: position to the right of the Faaliyetler link
        submenu.style.top = `${rect.top}px`;
        submenu.style.left = `${rect.right}px`;
    }
}

// Menüyü kapatma fonksiyonu
function closeMenu(event) {
    const menu = document.getElementById('menu');
    const submenu = document.getElementById('submenu');
    const hamburger = document.getElementById('hamburger');
    const desktopSubmenuLink = document.querySelector('.desktop-menu .has-submenu');
    
    if (!menu.contains(event.target) && !hamburger.contains(event.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    if (!submenu.contains(event.target) && submenu.classList.contains('active')) {
        submenu.classList.remove('active');
        if (desktopSubmenuLink) {
            desktopSubmenuLink.classList.remove('active');
        }
    }
}

// Karanlık mod geçiş fonksiyonu
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Footer ve Header'ı sayfaya ekleyen fonksiyon
function injectHeaderAndFooter() {
    document.addEventListener('click', closeMenu);
    
    // Karanlık mod durumunu kontrol et ve uygula
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Hamburger menüsünün scroll davranışını ayarla
    const menu = document.getElementById('menu');
    menu.addEventListener('wheel', (e) => {
        e.stopPropagation();
    });

    // Add event listener for desktop submenu
    const desktopSubmenuLink = document.querySelector('.desktop-menu .has-submenu');
    if (desktopSubmenuLink) {
        desktopSubmenuLink.addEventListener('click', toggleSubmenu);
    }
}

// Sayfa yüklendiğinde Footer ve Header'ı ekle
const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
document.addEventListener('DOMContentLoaded', injectHeaderAndFooter);
