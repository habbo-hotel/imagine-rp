export function isJSON(data: any): boolean {
  try {
    JSON.parse(data)
    return true;
  } catch (e) {
    return false
  }
}

export function hexToAscii(hexString: string): string {
  let asciiString = '';

  for (let i = 0; i < hexString.length; i += 2) {
    let hexChar = hexString.substring(i, i + 2);
    let asciiChar = String.fromCharCode(parseInt(hexChar, 16));
    asciiString += asciiChar;
  }

  return asciiString;
}

export function convertBinaryToStringOrJson(hexData: string): string | object {
  // Remove spaces and any address part of a hex dump (like "00000000:")
  hexData = hexData.replace(/[^a-fA-F0-9]/g, '');

  const asciiString = hexToAscii(hexData);

  try {
    return JSON.parse(asciiString);
  } catch (e) {
    return asciiString;
  }
}

export function stringToBinary(inputString: string): string {
  let binaryResult = '';

  for (let i = 0; i < inputString.length; i++) {
    let binaryChar = inputString.charCodeAt(i).toString(2);
    binaryResult += binaryChar + ' ';
  }

  return binaryResult.trim();
}

export function parseEventName(input: string): string {
  const parts = input.split('¡');
  return parts.length > 0 ? parts[0] : '';
}