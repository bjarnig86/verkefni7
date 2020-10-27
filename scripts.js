/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  var answer = prompt("Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“");
  var ansLow = answer.toLowerCase();
  if (ansLow === 'kóða' || ansLow === 'afkóða') {
    var n = hlidrunCheck(n);
    var str = checkString(str, answer, n);
    if (ansLow === 'kóða') {
      var dulkodun = encode(str, n);
      alert(dulkodun);
      return;
    } else {
      var dulkodun = decode(str, n);
      alert(dulkodun);
      return;
    }
  } else {
    alert(`Veit ekki hvaða aðgerð ${answer} er. Reyndu aftur.`)
    start();
  }
}



// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
do {
start();
} while (confirm('Viltu prófa aftur?'));

/**
 * Skoðar hvort hliðrunartala sé af réttri stærð.
 *
 * @param {number} n
 */

function hlidrunCheck(n) {
  var n = parseInt(prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]'));
  if (n < 1 || n > 31 || NaN) {
    do {
      var n = parseInt(prompt(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`));
    } while (n < 1 || n > 31 || NaN);
  }
  return n;
}
/**
 * Býr til streng til að hliðra ef allir stafir eru löglegir.
 *
 * @param {string} str
 */
function checkString(str, answer, n) {
  var str = prompt(`Gefðu upp strenginn sem á að ${answer} með hliðrun ${n}:`);

  do {
  var invalid = '';
  for (let i = 0; i < str.length; i++) {
    var stafur = str[i].toUpperCase();
    if (str[i] === ' ' || str[i] === '  ') {
      continue;
    }
    if (LETTERS.indexOf(stafur) === -1) {
      invalid += stafur;
    }
  }

  if (invalid.length > 0) {

      invalid = invalid.split('');
      var str = prompt(`Þú gafst upp stafi sem ekki er hægt að ${answer}: ${invalid.join(', ')}. Reyndu aftur.`)
    }
  } while (invalid.length > 0);
  return str;
}

//for (let i = 0; i < str.length; i++) {
//  for (let j = 0; j < LETTERS.length; j++) {
//    if (str[i].toUpperCase() !== LETTERS[j]) {
//      invalid += str[i];
//    }
//  }
//}
//if (invalid.length > 0) {
//  return invalid;
//}


/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  n = n % 32;
  var upperCaseStr = str.toUpperCase();
  var aplhaArray = LETTERS.split('');
  var encodedString = '';

  for (var i = 0; i < upperCaseStr.length; i++) {
    var currentLetter = upperCaseStr[i];
    if (currentLetter === ' ') {
      encodedString += currentLetter;
      continue;
    }
    var currentIndex = aplhaArray.indexOf(currentLetter);
    var newIndex = currentIndex + n;
    if (newIndex > 31) newIndex = newIndex - 32;
    if (newIndex < 0) newIndex = newIndex + 32;
    if (str[i] === upperCaseStr[i].toLowerCase()) {
      encodedString += aplhaArray[newIndex].toLowerCase();
    } else encodedString += aplhaArray[newIndex];
  }
  return encodedString;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  n = n % 32;
  var upperCaseStr = str.toUpperCase();
  var aplhaArray = LETTERS.split('');
  var decodedString = '';

  for (var i = 0; i < upperCaseStr.length; i++) {
    var currentLetter = upperCaseStr[i];
    if (currentLetter === ' ') {
      decodedString += currentLetter;
      continue;
    }
    var currentIndex = aplhaArray.indexOf(currentLetter);
    var newIndex = currentIndex - n;
    if (newIndex > 31) newIndex = newIndex - 32;
    if (newIndex < 0) newIndex = newIndex + 32;
    if (str[i] === upperCaseStr[i].toLowerCase()) {
      decodedString += aplhaArray[newIndex].toLowerCase();
    } else decodedString += aplhaArray[newIndex];
  }
  return decodedString;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
