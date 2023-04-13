Create table Usuario (
	Id int auto_increment primary key,
    Nome varchar(255),
    Email varchar(100),
    Senha varchar(255)
)


INSERT INTO crmreactdb.Usuario (Nome,Email,Senha,Imagem) values ('ricardo','ricardo@gvp.com','$2a$10$hWHlNoUwE1BOf4HMWPBHbu3/I5hPKCTk/7G19Tfn9dMnqorlZbXMu','');
 SELECT Id FROM crmreactdb.Usuario Where Email = 'ricardo@gvp.com'