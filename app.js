/* Set the width of the side navigation to 250px */
  function openNav() {
    document.getElementById("leftSidebar").style.width = "250px";
  }
  
/* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("leftSidebar").style.width = "0";
  }

/* Generate key for encryption */
  function generateKey() {
    let keyHelper = [];
    for (let i=0; i<22; i++) {
      generatedNumber = String.fromCharCode(Math.floor(Math.random()*57)+33);
      keyHelper.push(generatedNumber);
      generatedKey = keyHelper.join("");
      }
    return generatedKey;
  }
/* Change key values back to decimal */
  function readKey(key) {
    decKey = key.split('');
    for (let i=0; i<22; i++){
      decKey[i] = String(key[i]).charCodeAt(0);
    }
    return decKey;
  }

/* Encrypt message using a key */
  function encryptText() {
    let userEncrypt = document.getElementById('userEncrypt').value;
    key = generateKey();
    readKey(key);
    userText = userEncrypt.split('');
    for (let i=0; i<userText.length; i++){
      userText[i] = String(userText[i]).charCodeAt(0);
    }
    for (let j=0; j<userText.length ;j++){
      if (j<22) {
        userText[j]= String.fromCharCode(parseInt(userText[j])+(parseInt(decKey[j])*5));
      } else {
        i=Math.floor(j/22);
        userText[j]= String.fromCharCode(parseInt(userText[j])+(parseInt(decKey[j-(22*i)])*5));
      }
    }
    encryptedText = userText.join("");
    event.preventDefault();
    return encryptedText;
  }

/* Show Encrypted message and key */
  function showEncrypted(){
    document.getElementById("encryptedLabel").style.display = "block";
    document.getElementById("encryptedBox").value = encryptedText;
    document.getElementById("encryptedBox").style.display = "block";    
    document.getElementById("encryptedBox").dispatchEvent(new Event("input"))
    document.getElementById("etextButton").style.display = "block";
    document.getElementById("keyLabel").style.display = "block";
    document.getElementById("yourKeyBox").value = key;
    document.getElementById("yourKeyBox").style.display = "block";
    document.getElementById("yourKeyBox").dispatchEvent(new Event("input"))
    document.getElementById("keyButton").style.display = "block";
    }

/* Decrypt message using a key */
  function decryptText() {
    let userDecrypt = document.getElementById('userDecrypt').value;
    let userKey = document.getElementById('userKey').value;
    readKey(userKey);
    userTextD = userDecrypt.split('');
    for (let i=0; i<userTextD.length; i++){
      userTextD[i] = String(userTextD[i]).charCodeAt(0);
    }
    for (let j=0; j<userTextD.length ;j++){
      if (j<22) {
        userTextD[j]= String.fromCharCode(parseInt(userTextD[j])-(parseInt(decKey[j])*5));
      } else {
        i=Math.floor(j/22);
        userTextD[j]= String.fromCharCode(parseInt(userTextD[j])-(parseInt(decKey[j-(22*i)])*5));
      }
    }
    decryptedText = userTextD.join("");
    event.preventDefault();
    return decryptedText;
  }

/* Show Decrypted message */
  function showDecrypted(){
    document.getElementById("decryptedLabel").style.display = "block";
    document.getElementById("decryptedBox").value = decryptedText;
    document.getElementById("decryptedBox").style.display = "block";
    document.getElementById("decryptedBox").dispatchEvent(new Event("input"))
    document.getElementById("dtextButton").style.display = "block";
  }

/* Call functions after submit */  
  function encrypt(){
    encryptText();
    showEncrypted();
  }

  function decrypt(){
    decryptText();
    showDecrypted();
  }

/* Check required values before submit */ 
  document.getElementById('encryption').addEventListener('submit', encrypt);
  document.getElementById('decryption').addEventListener('submit', decrypt);

/* Reset textarea after copying */
  function clipboardText(text) {
    var copyText = document.getElementById(text);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    var tooltip = document.getElementById("copyTooltip");
    tooltip.innerHTML = "Copied!";
  }

  function outFunc() {
    var tooltip = document.getElementById("copyTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }

  function autoAdjustHeight(textarea) {
    // Reset the height to default to get the scroll height
    textarea.style.height = 'auto';

    // Set the new height based on the scroll height
    textarea.style.height = textarea.scrollHeight + 'px';
}