disp = document.querySelector('#calc-display')
let resultStack = [];
var keyBuffer = new myBuffer();

document.querySelectorAll('button.calc-key').forEach(b => {
  b.addEventListener('click', e => {
    // console.log(b.id);
    keyBuffer.putItem(b.id);
  });
});

function allClear() {
  disp.style.minHeight = window.getComputedStyle(disp).height;
  disp.value = '';
}

// Notation for alternatives: ( a | b )
// Star means zero or more repetitions.
// expr ::= term (+ term | - term )*
// term ::= fator (* term | / term)* 
// factor ::= number | ( expr )
// number ::= number digit | digit

async function getExpr(curChar) {
  console.log('Type a number.');

  let value;
  let value2;
  let finished = false;

  ({ value, curChar } = await getTerm(curChar));

  // console.log('Value:', value, 'curChar:', curChar);
  while (!finished) {
    console.log(`getExpr: value=${value} curChar=${curChar}`);
    switch(curChar) {
      case 'keyPlus':
        ({ value: value2, curChar } = await getTerm());
        // console.log('Value2:', value2, 'curChar:', curChar);
        value += value2;
        disp.value = value;
        break;
      case 'keyMinus':
        ({ value: value2, curChar } = await getTerm());
        value -= value2;
        disp.value = value;
        break;
      default:
        finished = true;
        break;
    }
    // curChar = await keyBuffer.getItem();
  }

  disp.value = value;
  return value;
}

async function getTerm(curChar) {
  let value;
  let value2;
  let finished = false;

  ({ value, curChar } = await getFactor(curChar));

  while (!finished) {
    console.log(`getTerm: value=${value} curChar=${curChar}`);
    switch(curChar) {
      case 'keyTimes':
        ({ value: value2, curChar} = await getFactor());
        value *= value2;
        disp.value = value;
        break;
      case 'keyDiv':
        ({ value: value2, curChar} = await getFactor());
        value /= value2;
        disp.value = value;
        break;
      default:
        finished = true;
        break;
    }
  }
  return {value, curChar}
}

async function getFactor(curChar) {
  return await getNumber(curChar);
}

async function getNumber(curChar) {
  if (!curChar) curChar = await keyBuffer.getItem();
  console.log(curChar);
  let value = keyValue(curChar);
  disp.value = value;
  enableOps();

  curChar = await keyBuffer.getItem();
  while (isDigit(curChar)) {
    value *= 10;
    value += keyValue(curChar);
    disp.value = value;
    curChar = await keyBuffer.getItem();
    console.log(curChar);
  }
  return {value, curChar};
}

function keyValue(curChar) {
  switch(curChar) {
    case 'key0': return 0;
    case 'key1': return 1;
    case 'key2': return 2;
    case 'key3': return 3;
    case 'key4': return 4;
    case 'key5': return 5;
    case 'key6': return 6;
    case 'key7': return 7;
    case 'key8': return 8;
    case 'key9': return 9;
    default: throw 'keyValue: expected digit';
  }
}


function isDigit(key) {
  return (
    key == "key0" || key == "key1" || key == "key2" ||
    key == "key3" || key == "key4" || key == "key5" ||
    key == "key6" || key == "key7" || key == "key8" ||
    key == "key9"
  );

}
function isNum(key) {
  return ( isDigit(key) || key == "key."
  );
}

function enableNums() {
  document.querySelectorAll('.calc-key+.num').forEach(b => b.disabled = false);
}
function disableNums() {
  document.querySelectorAll('.calc-key+.num').forEach(b => b.disabled = true);
}

function enableOps() {
  document.querySelectorAll('.calc-key+.op').forEach(b => b.disabled = false);
}
function disableOps() {
  document.querySelectorAll('.calc-key+.op').forEach(b => b.disabled = true);
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
enableNums();
getExpr();
