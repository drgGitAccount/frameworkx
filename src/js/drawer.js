/**
 * FrameworkX Drawer (Off-canvas)
 */

class Drawer {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      ...options
    };

    this.isShown = false;
    this.backdropElement = null;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="drawer"]');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.hide());
    });

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element && this.options.backdrop) {
        this.hide();
      }
    });

    if (this.options.keyboard) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isShown && Drawer.getTopDrawer() === this) {
          this.hide();
        }
      });
    }
  }

  show() {
    if (this.isShown) return;

    if (this.options.backdrop) {
      this.createBackdrop();
    }

    this.element.style.display = 'block';
    requestAnimationFrame(() => {
      this.element.classList.add('show');
    });

    this.isShown = true;
    Drawer.registerOpen(this);

    if (this.options.focus) {
      this.enforceFocus();
    }

    document.body.classList.add('fw-drawer-open');
  }

  hide() {
    if (!this.isShown) return;

    this.element.classList.remove('show');
    this.isShown = false;
    Drawer.unregisterOpen(this);

    this.removeBackdrop();

    if (Drawer.openStack.length === 0) {
      document.body.classList.remove('fw-drawer-open');
    }

    setTimeout(() => {
      this.element.style.display = 'none';
    }, 200);
  }

  createBackdrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.className = 'fw-drawer-backdrop';
    document.body.appendChild(this.backdropElement);

    setTimeout(() => {
      if (this.backdropElement) {
        this.backdropElement.classList.add('show');
      }
    }, 10);

    this.backdropElement.addEventListener('click', () => {
      if (this.options.backdrop && Drawer.getTopDrawer() === this) {
        this.hide();
      }
    });
  }

  removeBackdrop() {
    if (!this.backdropElement) return;
    const backdropToRemove = this.backdropElement;
    this.backdropElement = null;
    backdropToRemove.classList.remove('show');
    setTimeout(() => backdropToRemove.remove(), 200);
  }

  enforceFocus() {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  static getInstance(element) {
    return element._fwDrawer || null;
  }

  static getOrCreateInstance(element, options = {}) {
    return element._fwDrawer || new Drawer(element, options);
  }

  static registerOpen(instance) {
    Drawer.openStack = Drawer.openStack.filter((item) => item !== instance);
    Drawer.openStack.push(instance);
  }

  static unregisterOpen(instance) {
    Drawer.openStack = Drawer.openStack.filter((item) => item !== instance);
  }

  static getTopDrawer() {
    return Drawer.openStack[Drawer.openStack.length - 1] || null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Drawer.openStack = [];

  document.querySelectorAll('.fw-drawer').forEach((drawerEl) => {
    drawerEl.classList.remove('show');
    drawerEl.style.display = 'none';
  });
  document.body.classList.remove('fw-drawer-open');
  document.querySelectorAll('.fw-drawer-backdrop').forEach((backdrop) => backdrop.remove());

  const drawerTriggers = document.querySelectorAll('[data-toggle="drawer"]');
  drawerTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = trigger.getAttribute('data-target') || trigger.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const drawer = Drawer.getOrCreateInstance(targetElement);
        drawer.show();
      }
    });
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Drawer;
} else if (typeof window !== 'undefined') {
  window.FrameworkX = window.FrameworkX || {};
  window.FrameworkX.Drawer = Drawer;
}
