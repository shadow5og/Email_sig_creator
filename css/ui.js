// UI class
export default class UI {
  //Private variables.

  //grabbing the form within the footer.
  #emailForm = document.querySelector("footer form");
  // grabbing the Rectangles with the different email clients
  #emailClients = Array.from(document.querySelectorAll(".email-client"));

  // Retrieve the table data which has the logo in it.
  #logoShine = document.querySelector(".logo-shine");

  // messing with the email boxes. I add toggle the border when it is clicked.
  #oldClient;

  // Getting the disclaimer button and it's message.
  #x = document.querySelector(".notifier-button");
  #disclaimer = document.querySelector(".notifier");

  // Getting all the input fields of the Officer particulars except for the email address.
  #inputs = Array.from(document.querySelectorAll('input[type="text"]'));

  constructor(user) {
    // I dynamically set the year of the copy write statement at the footer to the current year.
    (function yearGet() {
      let d = new Date();
      let thisYear = d.getFullYear(),
        element = document.querySelector("#copyrightYear");
      element.innerText = thisYear;
    })();

    // Reset the church logo animation every 10 seconds
    let logoShineInterval = setInterval(() => {
      this.#logoShine.classList.remove("shine-animation");

      void this.#logoShine.offsetWidth;

      this.#logoShine.classList.add("shine-animation");
    }, 10000);

    this.loadEvents(user, this.#oldClient);
  }

  // Returns the input fields.
  get fields() {
    return this.#inputs;
  }

  setField(data) {
    const field = this.#inputs.filter((input) => input.name === data.name)[0];

    field.value = data.value;
  }

  //Prevent Submit button from the email form from sending data.
  noSubmit(e) {
    e.preventDefault();
  }

  //Copying the element to the clipboard.
  CopyToClipboard(
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
      } else {
        //Using the old way of copying text.
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
      var doc = document,
        range,
        selection;

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
  saveToSig(input) {
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

  //Function for showing the Modal
  showModal = (e) => {
    let btn = e.target,
      instructions,
      modals = document.querySelector(".modals"),
      list =
        modals.firstElementChild.firstElementChild.children[1]
          .firstElementChild;

    document.body.classList.toggle("no-scroll");

    if (btn.name === "Exchange Server" || btn.name === "Thunderbird") {
      this.CopyToClipboard(document.querySelector("#signaturePreview"), true);
    } else {
      this.CopyToClipboard();
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
      case "Windows Mail":
        instructions = `<li>Open Mail App.</li>
        <li>Click on Settings (gear symbol at the bottom left)</li>
        <li>Go to Signature.</li>
        <li>Type you preferable signature on the dialogue box and turn the Use signature On.</li>
        <li>Click on the check box beside Apply to all accounts.</li>
        <li>Open a new mail and check if the change reflects.</li>`;
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
        <li>Click OK to confirm changes. Yeah Yeah!</li>`;
        break;
    }

    list.innerHTML = instructions;
    modals.classList.toggle("show");
  };

  // messing with the email boxes. I add toggle the border when it is clicked.
  changeEmailClient = (e) => {
    let btn = document.querySelector("main .copy-button .button");

    if (this.#oldClient != null) {
      this.#oldClient.classList.toggle("clicked");
    }

    let target = e.target;

    while (!target.classList.contains("email-client")) {
      target = target.parentElement;
    }

    target.classList.toggle("clicked");
    this.#oldClient = target;

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
  };

  //load all event listeners.
  loadEvents(user) {
    // Show the modal when the copy-button is clicked
    document
      .querySelector(".copy-button .button")
      .addEventListener("click", this.showModal);

    // Hide the modal when the "I'm Done" button is clicked.
    document.querySelector(".modals .button").addEventListener("click", (e) => {
      const emailClient = this.#oldClient;

      document.querySelector(".modals").classList.toggle("show");

      document.body.classList.toggle("no-scroll");

      emailClient.style.borderStyle = "none";

      document.querySelector("main .copy-button").classList.toggle("show");

      console.log(document.querySelector("main .copy-button .button"));
    });

    // Make the disclaimer disappear after clicking x.
    this.#x.addEventListener("click", (e) => {
      this.#disclaimer.classList.toggle("hide");
    });

    // Disabling the submit button from the form.
    this.#emailForm.addEventListener("submit", this.noSubmit);

    // adding event listeners into the  input fields except the email field.
    for (let input of this.#inputs) {
      input.addEventListener("keyup", (e) => {
        let t = []; // Pair the setTimer ID and the input element being targeted using that array.

        // Reset the timer every time a key is pressed within the same input.
        let index = 0;
        for (const typed of t) {
          if (e.target === typed[1]) {
            clearTimeout(typed[0]);
            t.splice(index, 1);
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
        this.saveToSig(input);

        // Updating user information.
        user.changeInfo(input.name, input.value);
      });
    }

    this.#emailClients = this.#emailClients.map((emailClient) => {
      emailClient.addEventListener("click", this.changeEmailClient);
      return emailClient;
    });
  }
}
