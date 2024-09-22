# Demitrius Box Server
# Descrição
O Demitrius Box Server é uma aplicação backend desenvolvida em Node.js utilizando o framework Express. A aplicação permite que usuários se registrem, façam login, gerenciem memórias pessoais e atualizem seus perfis. A comunicação entre o cliente e o servidor é feita através de APIs RESTful.

# Tecnologias Utilizadas
Node.js: Ambiente de execução para JavaScript.
Express: Framework para desenvolvimento de aplicações web.
CORS: Middleware para permitir requisições de diferentes origens.
Bcrypt: Biblioteca para hashing de senhas.
JSON Web Token (JWT): Para autenticação de usuários.

# Estrutura de Pastas
```
.
├── .vscode                # Configurações do Visual Studio Code
├── controllers            # Controladores para a lógica de negócios
├── data                   # Arquivos JSON para armazenamento de dados
├── node_modules           # Dependências do projeto
├── public                 # Diretório para arquivos públicos (ex: ícones)
├── repositories           # Repositórios para manipulação de dados
├── routes                 # Rotas da aplicação
├── services               # Serviços de negócios
├── utils                  # Utilitários diversos
├── app.js                 # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts do projeto
├── package-lock.json      # Versões fixas das dependências
└── .gitignore             # Arquivos e pastas a serem ignorados pelo Git
```

# Instalação
Clone o repositório:
git clone https://github.com/EnzoDemitrius10/DemitriusBox-server.git
cd DemitriusBox-server

Instale as dependências:
npm install

Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto e adicione a variável:
SECRET_KEY=your_secret_key # Substitua 'your_secret_key' por uma chave secreta forte e única.

Inicie o servidor:
node app.js
O servidor estará disponível em http://localhost:5000.

# Rotas
Autenticação
POST /auth/register
Registra um novo usuário.
Body: { "username": "string", "password": "string" }
POST /auth/login
Faz login do usuário e retorna um token JWT.
Body: { "username": "string", "password": "string" }

# Memórias
GET /api/memories?username=string
Retorna as memórias do usuário especificado.
POST /api/memories
Cria uma nova memória.
Body: { "username": "string", "title": "string", "date": "string", "icon": "string" }
PUT /api/memories/:id
Atualiza uma memória existente.
Body: { "title": "string", "date": "string", "icon": "string" }
DELETE /api/memories/:id
Deleta uma memória especificada pelo ID.

# Perfil do Usuário
GET /api/profile/:username
Retorna o perfil do usuário especificado.
PATCH /api/profile/:username/password
Atualiza a senha do usuário.
Body: { "newPassword": "string" }

# Contribuição
Faça um fork do projeto.

Crie uma branch para suas alterações:
git checkout -b feature/MinhaNovaFuncionalidade

Commit suas alterações:
git commit -m "Adicionando nova funcionalidade"

Push para a branch:
git push origin feature/MinhaNovaFuncionalidade

Abra um Pull Request.

# Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

# Contato
Para dúvidas ou sugestões, entre em contato através do email: enzodemitrius10@gmail.com.
