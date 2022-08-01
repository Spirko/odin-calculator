
disp = document.querySelector('#calc-display')
let resultStack = [];

function allClear() {
  disp.style.minHeight = window.getComputedStyle(disp).height;
  disp.value = '';
}

function getNumber() {
  console.log('Type a number.');
  disableOps();
  document.querySelectorAll('.calc-key+.num').forEach(b => {
    b.disabled = false;
    b.addEventListener('click', getDigit);
  });
}

function enableOps() {
  disableOps(false);
}
function disableOps(state = true) {
  document.querySelectorAll('.calc-key+.op').forEach(b => b.disabled = state);
}

function getDigit(e) {
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
