export class SearchResult extends HTMLElement {
  static observedAttributes = ['date', 'url', 'title'];

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.messageType) return;

    const template = document.getElementById(
      `search-result-${this.messageType}-template`,
    );
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.render();
  }

  get messageType() {
    return this.parentElement.getAttribute('message-type');
  }

  get columnClassName() {
    const columnClass = {
      info: 'is-info',
      warning: 'is-half m-auto',
      error: 'is-full m-auto',
    };

    return columnClass[this.messageType];
  }

  render() {
    this.className = `column ${this.columnClassName}`;

    if (this.messageType === 'info') {
      const link = this.querySelector('slot[name="link"] a');
      const dateSlot = this.querySelector('slot[name="date"]');

      if (!dateSlot || !link) return;

      link.href = this.getAttribute('url');
      link.textContent = this.getAttribute('title');
      dateSlot.textContent = new Date(
        Number(this.getAttribute('date')),
      ).toLocaleDateString();
    }

    if (this.messageType === 'warning') {
      const termSlot = this.querySelector('slot[name="term"]');

      if (!termSlot) return;

      termSlot.textContent = this.parentElement.getAttribute('search-term');
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }
}
