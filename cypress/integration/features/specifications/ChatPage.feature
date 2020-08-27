# language: pt
Funcionalidade: Chat page

Para utilizar se comunicar com os outros usuário o usuário tem que usar o chat

@chatPage
Cenário: Envio de mensagem

Dado que o usuário está na url '/chat'
E cypress deve aguardar o '@getMessagesSuccess'
Então o usuário deve visualizar um header padrão
Quando o usuário preenche o campo de mensagem
E clica no '.MuiFormLabel-root > .MuiButtonBase-root'
E cypress deve aguardar o '@postMessagesSuccess'

@chatPage
Cenário: Saio do chat

Dado que o usuário está na url '/chat'
E cypress deve aguardar o '@getMessagesSuccess'
Então o usuário deve visualizar um header padrão
Então clica no '.MuiToolbar-root > .MuiButtonBase-root'
E cypress deve aguardar o '@postMessagesSuccess'
E o usuário deve visualizar a url '/'

@failChatPage
Cenário: Envio mensagem sem texto

Dado que o usuário está na url '/chat'
E cypress deve aguardar o '@getMessagesSuccess'
Então o usuário deve visualizar um header padrão
E deve aparecer um alerta
E cypress deve aguardar o '@postMessagesFail'