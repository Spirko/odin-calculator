disp = document.querySelector('#calc-display');
parens = document.querySelector('#calc-parens');

const digits = [ 'key0', 'key1', 'key2', 'key3', 'key4',
  'key5', 'key6', 'key7', 'key8' ,'key9'];

const ops = [ 'keyCE', 'keyPlus', 'keyMinus', 'keyTimes', 'keyDiv' ];

const numStart = [ digits, 'key.', 'keyLParen'];
const midNum = [ digits, 'key.', 'keye', 'keyBS', ops ];

let curValue = 0;
let wipeOnDigit = false;
let valueStack = [];
let opStack = [];

document.querySelectorAll('button.calc-key').forEach(b => {
  b.addEventListener('click', e => {
    // console.log(b.id);
    processButton(b, e);
  });
});

function processButton(b, e) {
  console.log(b.id);
  switch (b.id) {
    case 'key0': case 'key1': case 'key2': case 'key3': case 'key4': 
    case 'key5': case 'key6': case 'key7': case 'key8': case 'key9':
    case 'key.': case 'keye':
      processDigit(b.id);
      break;
    case 'keyBS':
      processBS();
      break;
    case 'keyPlus': case 'keyMinus': case 'keyTimes': case 'keyDiv':
    case 'keyLParen': case 'keyRParen': case 'keyEquals':
      processOp(b.id);
      break;
    case 'keyClear':
      allClear();
      break;
    case 'keyCE':
      clearEntry();
      break;
    default:
      throw 'processButton: Invalid key';
      break;
  }
  console.log(`curValue: ${curValue}  wipeOnDigit: ${wipeOnDigit}`);
  console.log(`valueStack: ${valueStack}   opStack: ${opStack}`);
}

function allClear() {
  opStack = [];
  valueStack = [];
  clearEntry();
}

function clearEntry() {
  disp.style.minHeight = window.getComputedStyle(disp).height;
  disp.value = '0'; wipeOnDigit = true;
  curValue = 0;
  parens.value = '0';
  disable(midNum); enable(numStart);
}

function processDigit(id) {
  if (wipeOnDigit) { disp.value = ''; curValue = 0; wipeOnDigit = false; }
  // disp.value = (curValue !== 0?disp.value:'') + id.slice(3);
  disp.value += id.slice(3);
  disable(numStart); enable(midNum);
  curValue = parseFloat(disp.value);

  console.log(`'${disp.value}' = ${curValue}`);
}

function processBS() {
  disp.value = disp.value.slice(0,-1);
  if (disp.value.length === 0) {
    disp.value = '0';
    disable(midNum); enable(numStart);
  }
  curValue = disp.value-0;

  console.log(`'${disp.value}' = ${curValue}`);
}

function processOp(id) {

  console.log(`processOp: ${id} precedence ${precedence(id)}`);

  switch(id) {
    case 'keyLParen': // Easy: just push a left paren and keep track of it.
      opStack.push('keyLParen');
      incParens();
      break;
    case 'keyEquals':
      while (opStack.length > 0) {
        doNextOp();
      }
      disp.value = curValue;
      wipeOnDigit = true;
      disable(midNum); enable(numStart); enable(ops);
      break;
    case 'keyRParen':
      while (opStack.length > 0 && opStack.at(-1) !== 'keyLParen') {
        doNextOp();
      }
      opStack.pop();  // pop off the left paren
      disp.value = curValue;
      disable(numStart); enable(ops);
      decParens();
      break;
    case 'keyPlus': case 'keyMinus': case 'keyTimes': case 'keyDiv':
      while (opStack.length > 0 
        && opStack.at(-1) !== 'keyLparen'
        && precedence(opStack.at(-1)) >= precedence(id)) {
        doNextOp();
      }
      console.log(`valueStack: ${valueStack}   opStack: ${opStack}`);
      opStack.push(id);
      valueStack.push(curValue);
      disp.value = curValue;
      disable(ops); enable(numStart);
      wipeOnDigit = true;      
      break;
  default:
      throw `ToDo: Must implement ${id}`
  }

}

function doNextOp() {
  console.log(`doNextOp:  valueStack: ${valueStack} curValue: ${curValue} opStack: ${opStack} `);
  const op = opStack.pop();
  switch(op) {
    case 'keyPlus':  curValue = valueStack.pop() + curValue; break;
    case 'keyMinus': curValue = valueStack.pop() - curValue; break;
    case 'keyTimes': curValue = valueStack.pop() * curValue; break;
    case 'keyDiv':   curValue = valueStack.pop() / curValue; break;
    default:
      throw `ToDo: implement ${op}`;
      break;
  }
}

function precedence(id) {
  switch(id) {
    case 'keyPlus': case 'keyMinus':
      return 0;
    case 'keyTimes': case 'keyDiv':
      return 1;
  }
}


function decParens() {
  parens.value -= 1;
  ops.pop();
  if (parens.value === '0') {
    disable('keyRParen');
  }
}
function incParens() { 
  parens.value -= (-1); // Subtracting (-1) forces conversion to/from integer.
  ops.push('keyRParen');
}

function enable(id) {
  if (Array.isArray(id)) { id.forEach(b => enable(b)); }
  else document.getElementById(`${id}`).disabled = false;
}
function disable(id) {
  if (Array.isArray(id)) { id.forEach(b => disable(b)); }
  else document.getElementById(`${id}`).disabled = true;
}


// Kick things off by getting the first number.
allClear()
// enableNums();
// getExpr();
