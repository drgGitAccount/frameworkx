/**
 * FrameworkX Dropdown
 * A lightweight dropdown component
 */

class Dropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      toggle: '[data-toggle="dropdown"]',
      menu: '.fw-dropdown-menu',
      autoClose: true,
      ...options
    };
    
    this.isOpen = false;
    this.toggleElement = null;
    this.menuElement = null;
    
    this.init();
  }
  
  init() {
    // Find toggle and menu elements
    this.toggleElement = this.element.querySelector(this.options.toggle);
    this.menuElement = this.element.querySelector(this.options.menu);
    
    if (!this.toggleElement || !this.menuElement) {
      console.warn('Dropdown: Toggle or menu element not found');
      return;
    }
    
    // Bind events
    this.bindEvents();
  }
  
  bindEvents() {
    // Click on toggle
    this.toggleElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
    
    // Click outside to close
    if (this.options.autoClose) {
      document.addEventListener('click', (e) => {
        if (!this.element.contains(e.target) && this.isOpen) {
          this.hide();
        }
      });
    }
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
        this.toggleElement.focus();
      }
    });
    
    // Keyboard navigation
    this.menuElement.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });
  }
  
  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  show() {
    if (this.isOpen) return;
    
    // Position the menu
    this.positionMenu();
    
    // Show menu
    this.menuElement.classList.add('show');
    this.menuElement.setAttribute('aria-expanded', 'true');
    
    // Update toggle state
    this.toggleElement.setAttribute('aria-expanded', 'true');
    this.toggleElement.classList.add('show');
    
    this.isOpen = true;
    
    // Trigger show event
    this.triggerEvent('show');
    
    // Focus first menu item
    setTimeout(() => {
      const firstItem = this.getFirstMenuItem();
      if (firstItem) {
        firstItem.focus();
      }
    }, 100);
    
    // Trigger shown event
    setTimeout(() => {
      this.triggerEvent('shown');
    }, 150);
  }
  
  hide() {
    if (!this.isOpen) return;
    
    // Hide menu
    this.menuElement.classList.remove('show');
    this.menuElement.setAttribute('aria-expanded', 'false');
    
    // Update toggle state
    this.toggleElement.setAttribute('aria-expanded', 'false');
    this.toggleElement.classList.remove('show');
    
    this.isOpen = false;
    
    // Trigger hide event
    this.triggerEvent('hide');
    
    // Trigger hidden event
    setTimeout(() => {
      this.triggerEvent('hidden');
    }, 150);
  }
  
  positionMenu() {
    const toggleRect = this.toggleElement.getBoundingClientRect();
    const menuRect = this.menuElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Reset position
    this.menuElement.style.position = 'absolute';
    this.menuElement.style.top = '';
    this.menuElement.style.left = '';
    this.menuElement.style.right = '';
    this.menuElement.style.bottom = '';
    this.menuElement.style.transform = '';
    
    // Default position (bottom-left)
    let top = toggleRect.bottom + window.scrollY;
    let left = toggleRect.left + window.scrollX;
    
    // Check if menu goes below viewport
    if (top + menuRect.height > viewportHeight + window.scrollY) {
      // Try to position above
      const aboveTop = toggleRect.top + window.scrollY - menuRect.height;
      if (aboveTop >= window.scrollY) {
        top = aboveTop;
        this.menuElement.classList.add('dropup');
      } else {
        // Not enough space above, position at top of viewport
        top = window.scrollY;
      }
    } else {
      this.menuElement.classList.remove('dropup');
    }
    
    // Check if menu goes beyond right edge
    if (left + menuRect.width > viewportWidth + window.scrollX) {
      // Try to align right
      const rightAlign = toggleRect.right + window.scrollX - menuRect.width;
      if (rightAlign >= window.scrollX) {
        left = rightAlign;
      } else {
        // Not enough space, align to left edge
        left = window.scrollX;
      }
    }
    
    // Apply position
    this.menuElement.style.top = `${top}px`;
    this.menuElement.style.left = `${left}px`;
    this.menuElement.style.zIndex = '1000';
  }
  
  getFirstMenuItem() {
    const menuItems = this.menuElement.querySelectorAll(
      '.fw-dropdown-item:not(.disabled):not([aria-disabled="true"])'
    );
    return menuItems.length > 0 ? menuItems[0] : null;
  }
  
  handleKeyNavigation(e) {
    const menuItems = this.menuElement.querySelectorAll(
      '.fw-dropdown-item:not(.disabled):not([aria-disabled="true"])'
    );
    
    if (menuItems.length === 0) return;
    
    const currentIndex = Array.from(menuItems).indexOf(document.activeElement);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex].focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex].focus();
        break;
        
      case 'Home':
        e.preventDefault();
        menuItems[0].focus();
        break;
        
      case 'End':
        e.preventDefault();
        menuItems[menuItems.length - 1].focus();
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (document.activeElement.classList.contains('fw-dropdown-item')) {
          document.activeElement.click();
        }
        break;
        
      case 'Tab':
        if (this.options.autoClose) {
          this.hide();
        }
        break;
    }
  }
  
  triggerEvent(eventName) {
    const event = new CustomEvent(`fw-dropdown.${eventName}`, {
      detail: { dropdown: this }
    });
    this.element.dispatchEvent(event);
  }
  
  // Static methods
  static getInstance(element) {
    return element._fwDropdown || null;
  }
  
  static getOrCreateInstance(element, options = {}) {
    return element._fwDropdown || new Dropdown(element, options);
  }
  
  // Global method to close all dropdowns
  static closeAll() {
    const dropdowns = document.querySelectorAll('.fw-dropdown.show');
    dropdowns.forEach(dropdown => {
      const instance = Dropdown.getInstance(dropdown);
      if (instance) {
        instance.hide();
      }
    });
  }
}

// Auto-initialize dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdownElements = document.querySelectorAll('.fw-dropdown');
  
  dropdownElements.forEach(element => {
    Dropdown.getOrCreateInstance(element);
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.fw-dropdown')) {
      Dropdown.closeAll();
    }
  });
});

// Handle dropdown in navbars
document.addEventListener('DOMContentLoaded', () => {
  const navbars = document.querySelectorAll('.fw-navbar');
  
  navbars.forEach(navbar => {
    navbar.addEventListener('click', (e) => {
      const dropdown = e.target.closest('.fw-dropdown');
      
      if (dropdown) {
        // Close other dropdowns in the same navbar
        const otherDropdowns = navbar.querySelectorAll('.fw-dropdown.show');
        otherDropdowns.forEach(other => {
          if (other !== dropdown) {
            const instance = Dropdown.getInstance(other);
            if (instance) {
              instance.hide();
            }
          }
        });
      }
    });
  });
});

// Export for CommonJS/ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dropdown;
} else if (typeof window !== 'undefined') {
  window.FrameworkX = window.FrameworkX || {};
  window.FrameworkX.Dropdown = Dropdown;
}
