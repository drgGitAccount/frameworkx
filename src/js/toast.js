/**
 * FrameworkX Toast
 */

class Toast {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      delay: 4000,
      autohide: true,
      ...options
    };
    this.hideTimer = null;
    this.init();
  }

  init() {
    const closeBtn = this.element.querySelector('[data-dismiss="toast"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    this.element.addEventListener('mouseenter', () => this.pause());
    this.element.addEventListener('mouseleave', () => this.resume());
  }

  show() {
    this.element.classList.add('show');
    if (this.options.autohide) {
      this.startTimer();
    }
  }

  hide() {
    this.element.classList.remove('show');
    this.clearTimer();
    setTimeout(() => {
      this.element.remove();
    }, 250);
  }

  startTimer() {
    this.clearTimer();
    this.hideTimer = setTimeout(() => this.hide(), this.options.delay);
  }

  pause() {
    this.clearTimer();
  }

  resume() {
    if (this.options.autohide) {
      this.startTimer();
    }
  }

  clearTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  static getOrCreateContainer(position = 'top-right') {
    let container = document.querySelector(`.fw-toast-container[data-position="${position}"]`);
    if (!container) {
      container = document.createElement('div');
      container.className = `fw-toast-container ${position.replace('-', '-')}`;
      container.dataset.position = position;
      document.body.appendChild(container);
    }
    return container;
  }

  static create({ type = 'info', title = 'Notice', message = '', position = 'top-right', delay = 4000 } = {}) {
    const container = Toast.getOrCreateContainer(position);
    const toast = document.createElement('div');
    toast.className = `fw-toast fw-toast-${type}`;
    toast.innerHTML = `
      <div class="fw-toast-icon">${Toast.getIcon(type)}</div>
      <div>
        <div class="fw-toast-title">${title}</div>
        <div class="fw-toast-message">${message}</div>
      </div>
      <button class="fw-toast-close" data-dismiss="toast" aria-label="Close">×</button>
    `;
    container.appendChild(toast);
    const instance = new Toast(toast, { delay });
    requestAnimationFrame(() => instance.show());
    return instance;
  }

  static getIcon(type) {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '!';
      case 'warning': return '!';
      case 'info':
      default: return 'i';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fw-toast').forEach((toastEl) => {
    const instance = new Toast(toastEl);
    requestAnimationFrame(() => instance.show());
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Toast;
} else if (typeof window !== 'undefined') {
  window.FrameworkX = window.FrameworkX || {};
  window.FrameworkX.Toast = Toast;
}
