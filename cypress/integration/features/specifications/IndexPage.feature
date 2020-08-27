# language: pt
Funcionalidade: Index page

Para utilizar o chat o usuário precisa colocar seu nome

@indexPage
Cenário: Acesso ao chat com nome

Dado que o usuário está na url '/'
Então o usuário deve visualizar um header padrão
E o usuário deve visualizar um formulário de nome
Quando o usuário insere seu nome
E clica no '.MuiButtonBase-root'
E cypress deve aguardar o '@postMessagesSuccess'
E cypress deve aguardar o '@getMessagesSuccess'
Então o usuário deve visualizar a url '/chat'