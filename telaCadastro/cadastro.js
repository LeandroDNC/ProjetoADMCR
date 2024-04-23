document.addEventListener("DOMContentLoaded", function() {
    const dadosCadastraisForm = document.getElementById('dadosCadastraisForm');
    const enderecoForm = document.getElementById('enderecoForm');
    const cepInput = document.getElementById('cep');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const buscarCepBtn = document.getElementById('buscarCep');
    const fotoInput = document.getElementById('foto');
     const previewDiv = document.getElementById('preview');


    dadosCadastraisForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (dadosCadastraisForm.checkValidity()) {
        alert('Dados cadastrais enviados com sucesso!');
        dadosCadastraisForm.reset();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    });
  
    enderecoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (enderecoForm.checkValidity()) {
        alert('Endereço cadastrado com sucesso!');
        enderecoForm.reset();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    });


    fotoInput.addEventListener('change', function() {
        const file = fotoInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewDiv.innerHTML = `<img src="${e.target.result}" alt="Preview da foto" class="preview-img">`;
          };
          reader.readAsDataURL(file);
        } else {
          previewDiv.innerHTML = ''; 
        }
      });
      
    
  
    cepInput.addEventListener('input', buscarEndereco);
  
    function buscarEndereco() {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              alert('CEP não encontrado. Por favor, verifique o CEP informado.');
            } else {
              preencherCamposEndereco(data);
            }
          })
          .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.');
          });
      }
    }
  
    function preencherCamposEndereco(data) {
      ruaInput.value = data.logradouro;
      bairroInput.value = data.bairro;
      cidadeInput.value = data.localidade;
      estadoInput.value = data.uf;
    }
  });

