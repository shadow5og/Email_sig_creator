// Retrieve the table data which has the logo in it.
var logoShine = document.querySelector(".logo-shine");

// Reset the church logo animation every 10 seconds
let logoShineInterval = setInterval(() => {
  logoShine.classList.remove("shine-animation");

  void logoShine.offsetWidth;

  logoShine.classList.add("shine-animation");
}, 10000);

// I dynamically set the year of the copy write statement at the footer to the current year.
function yearGet() {
  let d = new Date();
  let thisYear = d.getFullYear(),
    element = document.querySelector("#copyrightYear");
  element.innerText = thisYear;
}

//Copying the element to the clipboard.
function CopyToClipboard(
  element = document.querySelector("#signaturePreview"),
  copyHTML = false
) {
  if (copyHTML) {
    let code = document.createElement("textarea");
    code.classList.toggle("hide");

    code.value = element.innerHTML;

    // copy the input text to the clipboard
    if (navigator.clipboard) {
      //checking if the browser supports the clipboard API
      navigator.clipboard.writeText(code.value).then(() => {
        alert("Copied to clipboard");
      });
    } else { //Using the old way of copying text.
      console.log("Browser Not compatible");
      code.select();
      document.execCommand("copy");

      // clear the selection
      window.getSelection().removeAllRanges();

      // delete the element
      code.remove();
    }
  } else {
    // Copying elements the old way.
    var doc = document, range, selection;

    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Copied to clipboard");
  }
}

// Send text input of user details to the email signature except for the email address in the footer.
// That entire form is just there for show at the moment.
function saveToSig(input) {
  if (input.id === "name") {
    document.getElementById("sName").textContent = input.value;
  } else if (input.id === "surname") {
    document.getElementById("sSurname").textContent = input.value;
  } else if (input.id === "department") {
    document.getElementById("sDept").textContent = input.value;
  } else if (input.id === "position") {
    document.getElementById("sRole").textContent = " " + input.value;
  } else if (input.id === "cellphone") {
    document.getElementById("sMobile").textContent = input.value;
  }
}

//Prevent Submit button from the email form from sending data.
function noSubmit(e) {
  e.preventDefault();
}

// messing with the email boxes. I add toggle the border when it is clicked.
let oldClient;
function changeEmailClient(e) {
  let btn = document.querySelector("main .copy-button .button");

  if (oldClient != null) {
    oldClient.classList.toggle("clicked");
  }

  let target = e.target;

  while (!target.classList.contains("email-client")) {
    target = target.parentElement;
  }

  target.classList.toggle("clicked");
  oldClient = target;

  let emailApp = target.children[1].innerText;

  if (!btn.parentElement.classList.contains("show")) {
    btn.parentElement.classList.toggle("show");
  }

  btn.setAttribute("name", emailApp);

  if (emailApp === "Exchange Server" || emailApp === "Thunderbird") {
    btn.value = "Copy HTML";
  } else {
    btn.value = "Copy Signature";
  }
}

//Function for showing the Modal
function showModal(e) {
  let btn = e.target,
    instructions,
    modals = document.querySelector(".modals"),
    list =
      modals.firstElementChild.firstElementChild.children[1].firstElementChild;

  if (btn.name === "Exchange Server" || btn.name === "Thunderbird") {
    CopyToClipboard(document.querySelector("#signaturePreview"), true);
  } else {
    CopyToClipboard();
  }

  switch (btn.name) {
    case "Outlook":
      instructions = `<li>In Outlook 2019/2016/2013/2010, click File to go to the Backstage view.</li>
      <li>Go to Options.</li>
      <li>Click the Mail tab and then Signatures in the Compose messages section.</li>
      <li>Create a new signature by clicking the New button.</li>
      <li>Paste the copied signature into the Edit signature section (Ctrl + V).</li>
      <li>Click OK.</li>`;
      break;
    case "Office 365":
      instructions = `<li>Go to the message content settings in Outlook on the web (you’ll need to log in to your Office 365 account if you’re not logged in already).</li>
      <li>Paste the copied signature directly into the signature editor area.</li>
      <li>Save changes by clicking the Save button.</li>`;
      break;
    case "Apple Mail":
      instructions = `<li>While the Apple Mail is active, go to Mail > Preferences > Signatures</li>
      <li>Choose your account.</li>
      <li>Click the + button to add a new signature.</li>
      <li>Uncheck the Always match my default message font option.</li>
      <li>Finally, paste the copied email signature.</li>`;
      break;
    case "Gmail":
      instructions = `<li>Log in to Gmail/G Suite.</li>
      <li>Click the gear icon in the upper-right corner and choose See all settings.</li>
      <li>On the General tab (default), scroll down to the Signature section.</li>
      <li>Click the Create new button to add a new email signature or the Edit button if you want to replace an existing signature.</li>
      <li>Paste the copied signature in the Edit signature section (Ctrl + V).</li>
      <li>Optional) Choose whether to insert the signature automatically for new emails and replies and forwards.</li>
      <li>Scroll down and click Save changes.</li>`;
      break;
    case "Exchange Server":
      instructions = `<li>Go to the Exchange admin center.</li>
      <li>Go to mail flow > rules.</li>
      <li>Click the plus (+) button and choose Apply disclaimers.</li>
      <li>In the window that opens, name your new signature and define conditions under which it should be applied.</li>
      <li>Click Enter text on the right side of the window and paste (Ctrl + V) the copied HTML code.</li>
      <li>Confirm by clicking the Save button.</li>`;
      break;
    case "Thunderbird":
      instructions = `<li>Open Mozilla Thunderbird.</li>
      <li>Click on your email account name in the folder tree in the left pane.</li>
      <li>Click View settings for this account under the Accounts section.</li>
      <li>Scroll down to Signature text and select the Use HTML checkbox.</li>
      <li>Paste the copied HTML code into the signature input field.</li>
      <li>Click OK to confirm changes.</li>`;
      break;
  }

  list.innerHTML = instructions;
  modals.classList.toggle("show");
}

// Show the modal when the copy-button is clicked
document
  .querySelector(".copy-button .button")
  .addEventListener("click", showModal);

// Hide the modal when the "I'm Done" button is clicked.
document.querySelector(".modals .button").addEventListener("click", (e) => {
  document.querySelector(".modals").classList.toggle("show");
});

emailClients = document.querySelectorAll(".email-client");
for (emailClient of emailClients) {
  emailClient.addEventListener("click", changeEmailClient);
}

// Getting all text and email inputs, adding event listeners to all of them and saving data to local storage, i.e,
// data is saved within the device that the user is using.
let inputs = document.querySelectorAll('input[type="text"]');
// inputs = Array.from(inputs);

// inputs.push(document.querySelector('input[type="email"]')); Removing it since I don't care about it.

for (const input of inputs) {
  // Checking if local storage has data in it.
  if (localStorage.length > 0) {
    // Setting the input fields to whatever is saved in local storage.
    switch (input.name) {
      case "first name":
        input.value = localStorage.getItem("first name");
        break;
      case "last name":
        input.value = localStorage.getItem("last name");
        break;
      case "department":
        input.value = localStorage.getItem("department");
        break;
      case "position":
        input.value = localStorage.getItem("position");
        break;
      case "cellphone":
        input.value = localStorage.getItem("cellphone");
        break;
      default:
        break;
    }

    // Send text input of user details to the email signature except for the email address in the footer.
    // That entire form is just there for show at the moment.
    saveToSig(input);
  }

  input.addEventListener("keyup", (e) => {
    var t = []; // Pair the setTimer ID and the input element being targeted using that array.

    // Reset the timer every time a key is pressed within the same input.
    let index = 0;
    for (const typed of t) {
      if (e.target === typed[1]) {
        clearTimeout(typed[0]);
        t.splice(index);
        console.log("Cleared");

        break; // I literally break out of the iterations as soon as I have done what I wanted.
      }

      index++;
    }

    input.classList.add("input-active");

    // Save the nameless array which has the time out id and the respective input element into the array, t.
    t.push([
      setTimeout(() => {
        input.classList.remove("input-active");

        index = 0;
        t.splice(
          t.every((typed) => {
            if (e.target === typed[1]) {
              return index;
            }

            index++;
          })
        );
      }, 3000),
      e.target,
    ]);

    // Send text input of user details to the email signature except for the email address in the footer.
    // That entire form is just there for show at the moment.
    saveToSig(input);

    // Saving the input field data to local storage.
    localStorage.setItem(input.name, input.value);
  });
}

let emailForm = document.querySelector("footer form");
emailForm.addEventListener("submit", noSubmit);

// const collection = document.body.children;
// items = Array.from(collection);
// items.array.forEach(element => {
//   element.classList.add()
// });
