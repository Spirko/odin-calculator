class myBuffer {
  #buffer = [];
  #resolvers = [];

  // No need for a constructor.

  // getItem will immediately return an available item,
  //   but wait for a putItem if the buffer is empty.
  getItem() {
    let p = new Promise((resolve,reject) => {
      this.#resolvers.push(resolve);
      this.resolvePromises();
    });
    return p;
  }

  resolvePromises() {
    while (this.#resolvers.length && this.#buffer.length) this.#resolvers.shift()(this.#buffer.shift());
  }

  // putItem will add an item to the buffer.
  // If there is a waiting promise, resolve it.
  putItem(newItem) {
    this.#buffer.push(newItem);
    this.resolvePromises();
  }

  showBuffer() {
    return this.#buffer;
  }
}
