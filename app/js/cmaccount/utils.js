// Monkey patch CryptoJS to securely generate random WordArrays
CryptoJS.lib.WordArray.random = function(nBytes) {
  if (window.crypto && window.crypto.getRandomValues) {
    var randomValues = new Uint32Array(nBytes/4);
    window.crypto.getRandomValues(randomValues);

    // Convert randomValues to a plain array.
    randomValues = Array.prototype.slice.call(randomValues);

    return new CryptoJS.lib.WordArray.init(randomValues, nBytes);
  } else {
    // Original implementation
    var words = [];
    for (var i = 0; i < nBytes; i += 4) {
      words.push((Math.random() * 0x100000000) | 0);
    }

    return new WordArray.init(words, nBytes);
  }
};

var Util = (function(exports, _, CryptoJS) {
  // CryptoJS AES helpers
  var _aes = {
    encrypt: function(plaintext, key) {
      key = CryptoJS.enc.Hex.parse(key);

      // Generate a random iv
      var iv = CryptoJS.lib.WordArray.random(16);

      var encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });
      return encrypted.iv + encrypted.ciphertext;
    },

    decrypt: function(encrypted, key) {
      key = CryptoJS.enc.Hex.parse(key);
      // Slice to get iv and ciphertext
      encrypted = Util.hexToBytes(encrypted);
      var iv = encrypted.slice(0,16);
      var ciphertext = encrypted.slice(16, encrypted.length);

      window.encrypted = encrypted;
      window.iv = iv;
      window.ciphertext = ciphertext;

      // Encode them to a format CryptoJS can understand
      iv = CryptoJS.enc.Hex.parse(Util.bytesToHex(iv));
      ciphertext = CryptoJS.enc.Hex.parse(Util.bytesToHex(ciphertext));

      var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext, iv: iv, key: key }, key, { iv: iv });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  };
    

  // Module Exports
  exports.sha512 = function(s) {
    var hashed = CryptoJS.SHA512(s);
    return CryptoJS.enc.Hex.stringify(hashed);
  };

  exports.md5 = function(s) {
    var hashed = CryptoJS.MD5(s);
    return CryptoJS.enc.Hex.stringify(hashed);
  };

  exports.doubleHash = function(s) {
    return exports.sha512(exports.sha512(s));
  };

  exports.aes = _aes;
  exports.ecdh = new ECDH("secp256r1");
  exports.bytesToHex = function(bytes) {
    var hexDigits = "0123456789abcdef";
    var result = "";
    for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i] & 0xFF;
      result += hexDigits[b >> 4] + hexDigits[b & 15];
    }
    return result;
  };
  exports.hexToBytes = function(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt("0x" + hex.substr(i, 2), 16));
    }
    return bytes;
  };

  exports.matchError = function(errors, code) {
    if (_.findWhere(errors, {code: code})) {
      return true;
    } else {
      return false;
    }
  };

  exports.setLocale = function(id) {
    localStorage.setItem('locale', JSON.stringify({locale: id}));
    location.reload();
  };

  return exports;

})(window.Util || {}, _, CryptoJS);
