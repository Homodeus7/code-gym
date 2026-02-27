function $(selector) {
  const els = document.querySelectorAll(selector);

  return new DomNodes(els);
}

class DomNodes {
  constructor(els) {
    this.els = els;
  }
  addClass(className) {
    this.els.forEach((el) => el.classList.add(className));
    return this;
  }

  toggleClass(className) {
    this.els.forEach((el) => el.classList.toggle(className));
    return this;
  }

  removeClass(className) {
    this.els.forEach((el) => el.classList.remove(className));
    return this;
  }

  css(slyles) {
    this.els.forEach(
      (el) => Object.assign(el.style, slyles),
      // for (const key in styles) {
      //    el.style[key] = styles[key];
      //  }
    );
    return this;
  }

  html(content) {
    this.els.forEach((el) => (el.innerHTML = content));
    return this;
  }
}
