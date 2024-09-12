class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    this.formResponse = document.getElementById(settings.responseElementId); // ID da div de resposta
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    if (this.formResponse) {
      this.formResponse.innerHTML = "<p class='text-success'>Mensagem enviada com sucesso!</p>";
    }
  }

  displayError() {
    if (this.formResponse) {
      this.formResponse.innerHTML = "<p class='text-danger'>Ops! Algo deu errado. Tente novamente mais tarde.</p>";
    }
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      if (response.ok) {
        this.displaySuccess();
      } else {
        throw new Error('Erro na resposta do servidor');
      }
    } catch (error) {
      this.displayError();
      console.error('Erro:', error);
    } finally {
      // Limpa o formulário e reativa o botão de envio
      if (this.form) {
        this.form.reset(); // Limpa os campos do formulário
      }
      if (this.formButton) {
        this.formButton.disabled = false;
        this.formButton.innerText = "Enviar";
      }
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

// Instancia e inicializa o FormSubmit com os seletores apropriados
const formSubmit = new FormSubmit({
  form: "#contactForm",
  button: "#contactForm button[type='submit']",
  responseElementId: "formResponse" // ID da div onde a resposta será exibida
});
formSubmit.init();