class myBuffer {
  #buffer = [];
  #gets = [];
  #peeks = [];

  // putItem will add an item to the buffer.
  // It will then resolve any pending promises.
  putItem(newItem) {
    this.#buffer.push(newItem);
    this.resolvePeeks();
    this.resolveGets();
  }

  // getItem promises to return an item when available.
  getItem() {
    let p = new Promise((resolve,reject) => {
      this.#gets.push(resolve);
      this.resolveGets();
    });
    return p;
  }

  // resolveGets goes through the pending gets and resolves them if possible.
  resolveGets() {
    while (this.#gets.length && this.#buffer.length)
      this.#gets.shift()(this.#buffer.shift());
  }

  // peeking looks at the first item without shifting.
  peek() {
    let p = new Promise((resolve,reject) => {
      this.#peeks.push(resolve);
      this.resolvePeeks();
    })
  }

  resolvePeeks() {
    while (this.#peeks.length)
      this.#peeks.shift()(this.#buffer[0]);
  }

  showBuffer() {
    return this.#buffer;
  }
}
