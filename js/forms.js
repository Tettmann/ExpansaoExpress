// ===========================================
// FORMS.JS — usado pelas duas páginas de formulário
// (documento.html = Contato, documento2.html = Trabalhe Conosco)
// Requer main.js carregado ANTES (menu/whatsapp/dropdown).
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  // Mostrar nome do arquivo selecionado
  const inputFile = document.getElementById('curriculo');
  const fileNameDisplay = document.getElementById('file-name');

  if (inputFile && fileNameDisplay) {
    inputFile.addEventListener('change', function () {
      if (this.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
      } else {
        fileNameDisplay.textContent = 'Formatos aceitos: .doc, .pdf ou .png';
      }
    });
  }

  // Impede o envio sem arquivo, apenas quando o campo é obrigatório
  // (documento2.html exige currículo; documento.html deixa o anexo opcional)
  const form = document.querySelector('form');
  if (form && inputFile) {
    form.addEventListener('submit', function (e) {
      if (inputFile.hasAttribute('required') && inputFile.files.length === 0) {
        e.preventDefault();
        alert('Por favor, selecione um arquivo antes de enviar o formulário.');
      }
    });
  }

});
