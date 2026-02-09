/**
 * FrameworkX Modal
 * A lightweight modal component
 */

class Modal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ...options
    };
    
    this.isShown = false;
    this.backdropElement = null;
    this.dialogElement = null;
    
    this.init();
  }
  
  init() {
    // Find dialog element
    this.dialogElement = this.element.querySelector('.fw-modal-dialog');
    
    // Bind events
    this.bindEvents();
    
    // Show modal if option is set
    if (this.options.show) {
      this.show();
    }
  }
  
  bindEvents() {
    // Click on close button
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.hide());
    });
    
    // Click on backdrop
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element && this.options.backdrop && Modal.getTopModal() === this) {
        this.hide();
      }
    });
    
    // Escape key
    if (this.options.keyboard) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isShown && Modal.getTopModal() === this) {
          this.hide();
        }
      });
    }
  }
  
  show() {
    if (this.isShown) return;
    
    // Show backdrop
    if (this.options.backdrop) {
      this.createBackdrop();
    }
    
    // Show modal
    this.element.style.display = 'flex';
    this.element.classList.add('show');
    
    // Set focus
    if (this.options.focus) {
      this.enforceFocus();
    }
    
    this.isShown = true;
    Modal.registerOpen(this);
    
    // Trigger show event
    this.triggerEvent('show');
    
    // Add body class
    document.body.classList.add('fw-modal-open');
    
    // Trigger shown event after animation
    setTimeout(() => {
      this.triggerEvent('shown');
    }, 150);
  }
  
  hide() {
    if (!this.isShown) return;
    
    // Hide modal
    this.element.classList.remove('show');
    
    this.isShown = false;
    Modal.unregisterOpen(this);
    
    // Trigger hide event
    this.triggerEvent('hide');
    
    // Remove body class when no modals remain
    if (Modal.openStack.length === 0) {
      document.body.classList.remove('fw-modal-open');
    }
    
    // Hide backdrop
    this.removeBackdrop();
    
    // Hide modal after animation
    setTimeout(() => {
      this.element.style.display = 'none';
      
      // Trigger hidden event
      this.triggerEvent('hidden');
    }, 150);
  }
  
  createBackdrop() {
    const baseBackdropZ = 1040;
    const baseModalZ = 1050;
    const index = Modal.openStack.length;
    this.element.style.zIndex = baseModalZ + index * 20;

    this.backdropElement = document.createElement('div');
    this.backdropElement.className = 'fw-modal-backdrop fade';
    this.backdropElement.dataset.modalId = this.element.id || '';
    this.backdropElement.style.zIndex = baseBackdropZ + index * 20;
    document.body.appendChild(this.backdropElement);
    
    // Show backdrop
    setTimeout(() => {
      if (this.backdropElement) {
        this.backdropElement.classList.add('show');
      }
    }, 10);
  }

  removeBackdrop() {
    if (!this.backdropElement) return;
    const backdropToRemove = this.backdropElement;
    this.backdropElement = null;
    backdropToRemove.classList.remove('show');
    setTimeout(() => {
      backdropToRemove.remove();
    }, 150);
  }
  
  enforceFocus() {
    // Focus trap implementation
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    // Prevent focus from leaving modal
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  triggerEvent(eventName) {
    const event = new CustomEvent(`fw-modal.${eventName}`, {
      detail: { modal: this }
    });
    this.element.dispatchEvent(event);
  }
  
  // Static methods
  static getInstance(element) {
    return element._fwModal || null;
  }
  
  static getOrCreateInstance(element, options = {}) {
    return element._fwModal || new Modal(element, options);
  }

  static registerOpen(instance) {
    Modal.openStack = Modal.openStack.filter((item) => item !== instance);
    Modal.openStack.push(instance);
  }

  static unregisterOpen(instance) {
    Modal.openStack = Modal.openStack.filter((item) => item !== instance);
  }

  static getTopModal() {
    return Modal.openStack[Modal.openStack.length - 1] || null;
  }
}

// Auto-initialize modals
document.addEventListener('DOMContentLoaded', () => {
  // Ensure all modals are hidden on load
  document.querySelectorAll('.fw-modal').forEach((modalEl) => {
    modalEl.classList.remove('show');
    modalEl.style.display = 'none';
  });
  document.body.classList.remove('fw-modal-open');
  document.querySelectorAll('.fw-modal-backdrop').forEach((backdrop) => backdrop.remove());
  Modal.openStack = [];

  const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSelector = trigger.getAttribute('data-target') || trigger.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        const modal = Modal.getOrCreateInstance(targetElement);
        modal.show();
      }
    });
  });
});

// Export for CommonJS/ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
} else if (typeof window !== 'undefined') {
  window.FrameworkX = window.FrameworkX || {};
  window.FrameworkX.Modal = Modal;
}
