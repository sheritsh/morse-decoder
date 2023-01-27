const MORSE_TABLE = {
  '.-' : 'a',
  '-...' : 'b',
  '-.-.' : 'c',
  '-..' : 'd',
  '.' : 'e',
  '..-.' : 'f',
  '--.' : 'g',
  '....' : 'h',
  '..' : 'i',
  '.---' : 'j',
  '-.-' : 'k',
  '.-..' : 'l',
  '--' : 'm',
  '-.' : 'n',
  '---' : 'o',
  '.--.' : 'p',
  '--.-' : 'q',
  '.-.' : 'r',
  '...' : 's',
  '-' : 't',
  '..-' : 'u',
  '...-' : 'v',
  '.--' : 'w',
  '-..-' : 'x',
  '-.--' : 'y',
  '--..' : 'z',
  '.----' : '1',
  '..---' : '2',
  '...--' : '3',
  '....-' : '4',
  '.....' : '5',
  '-....' : '6',
  '--...' : '7',
  '---..' : '8',
  '----.' : '9',
  '-----' : '0',
};

function decode(expr) {
  // write your solution here
  let sepCounter = 0;
  let lexema = '';
  let lexemArr = [];
  let morseArr = [];
  let resArr = [];

  // split the string into tokens
  for (i in expr) {
    lexema = `${lexema}${expr[i]}`
    sepCounter++;
    if (sepCounter == 10) {
      lexemArr.push(lexema);
      lexema = '';
      sepCounter = 0;
    }
  }

  // transform binary to morse
  let symbol = ''
  for (j in lexemArr) {
    let toHumanStr = '';
    morseArr.push(
        lexemArr[j].replaceAll('00', '').replaceAll('10', '.').replaceAll('11',
                                                                          '-'));
  }

  // replace morse to alphabet
  for (k in morseArr) {
    for (key in MORSE_TABLE) {
      if (morseArr[k] == key) {
        resArr.push(MORSE_TABLE[key]);
      } else if (morseArr[k] == '**********') {
        resArr.push(' ');
        break;
      }
    }
  }

  return resArr.toString().replaceAll(',', '');
}

function code(expr) {
  let toMorseConvertCode = [];
  let resBinaryObj = [];
  let res = '';

  // traversal through str and convert symbols to morse code
  for (i in expr) {
    for (key in MORSE_TABLE) {
      if (expr[i] == MORSE_TABLE[key]) {
        toMorseConvertCode.push(key);
      } else if (expr[i] == ' ') {
        toMorseConvertCode.push('**********');
        break;
      } else {
        // Error: 'unidentified character'
      }
    }
  }

  for (j in toMorseConvertCode) {
    if (toMorseConvertCode[j] != '**********') {
      let lexema = '';
      let symbolInBin;
      let prepareLength = 0;
      for (k in toMorseConvertCode[j]) {
        if (toMorseConvertCode[j][k] == '.') {
          symbolInBin = '10';
        } else if (toMorseConvertCode[j][k] == '-') {
          symbolInBin = '11';
        }
        lexema = `${lexema}${symbolInBin}`;
      }
      prepareLength = 10 - lexema.length;
      resBinaryObj.push('0'.repeat(prepareLength) + lexema);
    } else {
      resBinaryObj.push('**********');
    }
  }
  return resBinaryObj.toString().replace(/[\s.,%]/g, '');
}

module.exports = {decode}
