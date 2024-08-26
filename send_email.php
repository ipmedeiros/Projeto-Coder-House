<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $assunto = strip_tags(trim($_POST["assunto"]));
    $mensagem = trim($_POST["mensagem"]);

    if (empty($nome) || empty($email) || empty($assunto) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor, preencha todos os campos corretamente.";
        exit;
    }

    $to = "ipmedeirossilva@gmail.com";
    $subject = "Nova mensagem de $nome: $assunto";
    
    $email_content = "Nome: $nome\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Assunto: $assunto\n\n";
    $email_content .= "Mensagem:\n$mensagem\n";

    $headers = "From: $nome <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        echo "Obrigado! Sua mensagem foi enviada com sucesso.";
    } else {
        echo "Ops! Algo deu errado, e não conseguimos enviar sua mensagem.";
    }
} else {
    echo "Método inválido.";
}
?>