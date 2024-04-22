function loginEntrar() {
    const senhaValida = "admcroficial";
    const loginValido = "admcr";
    var senha = document.getElementById("senha").value;
    var login = document.getElementById("login").value;

    if (senha === senhaValida && login === loginValido) {
        alert("Login bem-sucedido!");
    } else {
        alert("Login ou senha incorretos. Tente novamente.");
    }
}