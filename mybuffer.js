class myBuffer {
  buffer = [];
  resolvers = [];

  // No need for a constructor.

  // getItem will immediately return an available item,
  //   but wait for a putItem if the buffer is empty.
  getItem() {
    let p = new Promise((resolve,reject) => {
      let curItem = this.buffer.shift();
      if (curItem) resolve(curItem);
      else this.resolvers.push(resolve);
    });
    return p;
  }

  // putItem will add an item to the buffer.
  // If there is a waiting promise, resolve it.
  putItem(newItem) {
    this.buffer.push(newItem);
    while (this.resolvers.length && this.buffer.length) this.resolvers.shift()(this.buffer.shift());
    this.resolve = undefined;
  }
}
