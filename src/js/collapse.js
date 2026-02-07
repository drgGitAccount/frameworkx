/**
 * FrameworkX Collapse
 * A lightweight collapse component
 */

class Collapse {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      toggle: true,
      parent: null,
      ...options
    };
    
    this.isTransitioning = false;
    this.isShown = false;
    this.triggerElement = null;
    this.targetElement = null;
    
    this.init();
  }
  
  init() {
    // Find trigger element if not provided
    this.triggerElement = this.element;
    this.targetElement = document.querySelector(
      this.element.getAttribute('data-target') || this.element.getAttribute('href')
    );
    
    if (!this.targetElement) {
      console.warn('Collapse: Target element not found');
      return;
    }
    
    // Set initial state
    this.isShown = this.targetElement.classList.contains('show');
    
    // Set ARIA attributes
    this.updateAria();
    
    // Bind events
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.options.toggle) {
      this.triggerElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
    
    // Listen for shown/hidden events
    this.targetElement.addEventListener('fw-collapse.shown', () => {
      this.isTransitioning = false;
    });
    
    this.targetElement.addEventListener('fw-collapse.hidden', () => {
      this.isTransitioning = false;
    });
  }
  
  toggle() {
    if (this.isTransitioning) return;
    
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  show() {
    if (this.isShown || this.isTransitioning) return;
    
    // Close other collapses in accordion
    if (this.options.parent) {
      this.closeSiblings();
    }
    
    this.isTransitioning = true;
    
    // Set height to 0 before showing
    this.targetElement.style.height = '0';
    this.targetElement.style.overflow = 'hidden';
    this.targetElement.classList.remove('collapse');
    this.targetElement.classList.add('collapsing');
    
    // Trigger show event
    this.triggerEvent('show');
    
    // Force reflow
    this.targetElement.offsetHeight;
    
    // Set height to auto
    this.targetElement.style.height = this.targetElement.scrollHeight + 'px';
    
    // Transition end
    const complete = () => {
      this.targetElement.classList.remove('collapsing');
      this.targetElement.classList.add('collapse', 'show');
      this.targetElement.style.height = '';
      this.targetElement.style.overflow = '';
      
      this.isShown = true;
      this.isTransitioning = false;
      
      // Update ARIA
      this.updateAria();
      
      // Trigger shown event
      this.triggerEvent('shown');
    };
    
    // Listen for transition end
    this.targetElement.addEventListener('transitionend', complete, { once: true });
    
    // Fallback for no transition support
    setTimeout(() => {
      if (this.isTransitioning) {
        complete();
      }
    }, 350);
  }
  
  hide() {
    if (!this.isShown || this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Set height to current height
    this.targetElement.style.height = this.targetElement.scrollHeight + 'px';
    this.targetElement.style.overflow = 'hidden';
    
    // Force reflow
    this.targetElement.offsetHeight;
    
    // Set height to 0
    this.targetElement.style.height = '0';
    
    // Update classes
    this.targetElement.classList.remove('collapse', 'show');
    this.targetElement.classList.add('collapsing');
    
    // Trigger hide event
    this.triggerEvent('hide');
    
    // Transition end
    const complete = () => {
      this.targetElement.classList.remove('collapsing');
      this.targetElement.classList.add('collapse');
      this.targetElement.style.height = '';
      this.targetElement.style.overflow = '';
      
      this.isShown = false;
      this.isTransitioning = false;
      
      // Update ARIA
      this.updateAria();
      
      // Trigger hidden event
      this.triggerEvent('hidden');
    };
    
    // Listen for transition end
    this.targetElement.addEventListener('transitionend', complete, { once: true });
    
    // Fallback for no transition support
    setTimeout(() => {
      if (this.isTransitioning) {
        complete();
      }
    }, 350);
  }
  
  closeSiblings() {
    if (!this.options.parent) return;
    
    const parent = document.querySelector(this.options.parent);
    if (!parent) return;
    
    const siblings = parent.querySelectorAll('.collapse.show');
    siblings.forEach(sibling => {
      if (sibling !== this.targetElement) {
        const instance = Collapse.getInstance(sibling);
        if (instance) {
          instance.hide();
        }
      }
    });
  }
  
  updateAria() {
    if (this.isShown) {
      this.triggerElement.setAttribute('aria-expanded', 'true');
      this.targetElement.setAttribute('aria-expanded', 'true');
    } else {
      this.triggerElement.setAttribute('aria-expanded', 'false');
      this.targetElement.setAttribute('aria-expanded', 'false');
    }
  }
  
  triggerEvent(eventName) {
    const event = new CustomEvent(`fw-collapse.${eventName}`, {
      detail: { collapse: this }
    });
    this.targetElement.dispatchEvent(event);
  }
  
  // Static methods
  static getInstance(element) {
    return element._fwCollapse || null;
  }
  
  static getOrCreateInstance(element, options = {}) {
    return element._fwCollapse || new Collapse(element, options);
  }
  
  // Static method to show all collapses
  static showAll(selector = '.collapse') {
    const collapses = document.querySelectorAll(selector);
    collapses.forEach(element => {
      const instance = Collapse.getInstance(element);
      if (instance && !instance.isShown) {
        instance.show();
      }
    });
  }
  
  // Static method to hide all collapses
  static hideAll(selector = '.collapse') {
    const collapses = document.querySelectorAll(selector);
    collapses.forEach(element => {
      const instance = Collapse.getInstance(element);
      if (instance && instance.isShown) {
        instance.hide();
      }
    });
  }
}

// Auto-initialize collapses
document.addEventListener('DOMContentLoaded', () => {
  const collapseTriggers = document.querySelectorAll('[data-toggle="collapse"]');
  
  collapseTriggers.forEach(trigger => {
    Collapse.getOrCreateInstance(trigger);
  });
});

// Handle accordion behavior
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[data-accordion]');
  
  accordions.forEach(accordion => {
    const selector = accordion.getAttribute('data-accordion') || '.collapse';
    const collapses = accordion.querySelectorAll(selector);
    
    collapses.forEach(collapse => {
      const triggers = document.querySelectorAll(`[data-target="#${collapse.id}"], [href="#${collapse.id}"]`);
      
      triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          
          const instance = Collapse.getOrCreateInstance(trigger, {
            parent: accordion
          });
          
          instance.toggle();
        });
      });
    });
  });
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openCollapses = document.querySelectorAll('.collapse.show');
    openCollapses.forEach(collapse => {
      const instance = Collapse.getInstance(collapse);
      if (instance) {
        instance.hide();
      }
    });
  }
});

// Export for CommonJS/ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Collapse;
} else if (typeof window !== 'undefined') {
  window.FrameworkX = window.FrameworkX || {};
  window.FrameworkX.Collapse = Collapse;
}
