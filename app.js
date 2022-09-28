const $spanConversion = document.querySelector('.conversion');
const $spanLength = document.querySelector('.length');
const $text = document.querySelector('[data-js="text-converter"]');
const $spanMessage = document.querySelector('.message');

const $inputReplaceFrom = document.querySelector(
  '[data-js="input-replace-from"]',
);
const $inputReplaceTo = document.querySelector('[data-js="input-replace-to"]');

const $buttonUpper = document.querySelector('[data-js="btn-upper-case"]');
const $buttonLower = document.querySelector('[data-js="btn-lower-case"]');
const $buttonCapitalize = document.querySelector(
  '[data-js="btn-capitalize-case"]',
);
const $buttonCapitalize2 = document.querySelector(
  '[data-js="btn-capitalize-case2"]',
);
const $buttonReplace = document.querySelector('[data-js="btn-replace"]');
const $buttonPascalCase = document.querySelector('[data-js="btn-pascal-case"]');
const $buttonCamelCase = document.querySelector('[data-js="btn-camel-case"]');
const $buttonDashedCase = document.querySelector('[data-js="btn-dashed-case"]');

$text.focus();

const textSplited = () => {
  const separator = $text.value.includes('-')
    ? '-'
    : $text.value.includes(' ')
      ? ' '
      : null;
  if (separator) {
    return $text.value.split(separator);
  } else {
    return $text.value.split(/(?=[A-Z])/)
  }
}

const hideMessage = () => {
  $spanMessage.classList.add('hide');
};

const showMessage = () => {
  $spanMessage.classList.remove('hide');

  setTimeout(() => {
    hideMessage();
  }, 5000);
};

const isValidText = (text) => {
  if (text.length) {
    return true;
  }
  return false;
};

const trim = (textValue) => {
  const result = textValue.split('').reduce((acc, letter) => {
    const currentLength = acc.length - 1;
    if (acc[currentLength] !== letter || acc[currentLength] !== ' ') {
      acc += letter;
    }
    return acc;
  }, '');

  return result.trim();
};

const converter = (textValue) => {
  const textValueTrim = trim(textValue);

  $spanConversion.textContent = textValueTrim;
  $spanLength.textContent = `${textValueTrim.length} ${textValueTrim.length > 1 ? 'caracteres' : 'caractere'
    }`;
  navigator.clipboard.writeText($spanConversion.textContent);

  showMessage();
};

$buttonUpper.addEventListener('click', () => {
  const textValue = $text.value.toUpperCase();
  if (!isValidText(textValue)) {
    return;
  }

  converter(textValue);
});

$buttonLower.addEventListener('click', () => {
  const textValue = $text.value.toLowerCase();
  if (!isValidText(textValue)) {
    return;
  }

  converter(textValue);
});

$buttonCapitalize.addEventListener('click', () => {
  const textValue = $text.value;
  if (!isValidText(textValue)) {
    return;
  }
  const textValueCapitalized =
    textValue[0].toUpperCase() + textValue.slice(1).toLowerCase();

  converter(textValueCapitalized);
});

$buttonCapitalize2.addEventListener('click', () => {
  const textValue = $text.value;
  if (!isValidText(textValue)) {
    return;
  }
  const arrayWords = textValue.split(' ');
  const newWords = arrayWords
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  converter(newWords);
});

$buttonReplace.addEventListener('click', () => {
  const textValue = $text.value;
  if (!isValidText(textValue)) {
    return;
  }
  const textReplaced = textValue.replaceAll(
    $inputReplaceFrom.value,
    $inputReplaceTo.value,
  );

  converter(textReplaced);

  $inputReplaceFrom.value = '';
  $inputReplaceTo.value = '';
});

$buttonPascalCase.addEventListener('click', () => {
  const newText = textSplited();
  const result = newText?.reduce((acc, t) => {
    const word = t?.slice(0, 1)?.toUpperCase() + t?.slice(1)?.toLowerCase();
    acc += word;
    return acc;
  }, '');

  converter(result);
});

$buttonCamelCase.addEventListener('click', () => {
  const newText = textSplited();
  const result = newText?.reduce((acc, t, i) => {
    let word = null;
    if (i == 0) {
      word = t.toLowerCase();
    } else {
      word = t?.slice(0, 1)?.toUpperCase() + t?.slice(1)?.toLowerCase();
    }
    acc += word;
    return acc;
  }, '');

  converter(result);
});

$buttonDashedCase.addEventListener('click', () => {
  const newText = textSplited();

  const result = newText?.reduce((acc, t, i) => {
    if (i == newText.length - 1) {
      acc += t;
    } else {
      acc += t + '-';
    }
    return acc.toLowerCase();
  }, '');

  converter(result);
});
