disp = document.querySelector('#calc-display')
let resultStack = [];
var keyBuffer = new myBuffer();

document.querySelectorAll('button.calc-key').forEach(b => {
  b.addEventListener('click', e => {
    console.log(b.id);
    keyBuffer.putItem(b.id);
  });
});

function allClear() {
  disp.style.minHeight = window.getComputedStyle(disp).height;
  disp.value = '';
}

async function getNumber() {
  console.log('Type a number.');
  disableOps();
  let d = await keyBuffer.getItem();
  console.log(d);
}

function enableOps() {
  disableOps(false);
}
function disableOps(state = true) {
  document.querySelectorAll('.calc-key+.op').forEach(b => b.disabled = state);
}

async function getDigit(e) {
  console.log(this.id);
  
  if (e.type == 'click') {
    switch(this.id) {
      case 'key1': case 'key2': case 'key3':
      case 'key4': case 'key5': case 'key6':
      case 'key7': case 'key8': case 'key9': case 'key0':
        disp.value += this.id[3];
        enableOps();
        break;
      case 'keyBS':
        disp.value = disp.value.slice(0,-1);
        if (disp.value.length == 0) disableOps();
        break;
      case 'keyRParen': case 'keyDiv': case 'keyTimes':
      case 'keyMinus': case 'keyPlus': case 'Equals':
        getOperator(e, this);
        break;
    }
  }


}


// Kick things off by getting the first number.
allClear()
getNumber();
