CREATE TABLE Propriedade(
	Id int auto_increment primary key NOT NULL,
	IdConta int NULL,
	IsSistema bit NULL,
	IdPropriedadeGrupo int NULL,
	IdTipoPropriedade int NULL,
	Nome varchar(255) NULL,
	Descricao varchar(255) NULL,
	IsRequired bit NULL,
	IsGrid bit NULL,
	IsCampoInicial bit NULL,
	IsIdentity bit NULL,
	Ordem int NULL,
	IdUsuarioCriacao int NULL,
	DataCriacao datetime NULL,
	IdUsuarioAlteracao int NULL,
	DataAlteracao datetime NULL,
	IsEntity bit NULL,
	Entity varchar(255) NULL,
	Tamanho varchar(255) NULL,
	Ativo bit NULL,
	IsReadOnly bit NULL,
	IsReport bit NULL
)

CREATE TABLE PropriedadeGrupo(
	Id int auto_increment primary key NOT NULL,
	IdConta int NULL,
	IdTipoCadastro int NULL,
	Nome varchar(255) NULL,
	Ordem int NULL,
	Icone varchar(255) NULL,
	IdUsuarioCriacao int NULL,
	DataCriacao datetime NULL,
	IdUsuarioAlteracao int NULL,
	DataAlteracao datetime NULL,
	IsAbreEmAbas bit NULL
)
CREATE TABLE PropriedadeRespostaTicket(
	Id bigint auto_increment primary key NOT NULL,
	IdPropriedade int NULL,
	IdConta int NULL,
	IdUser int NULL,
	Resposta varchar(3000) NULL,
	DataResposta datetime NULL
 )

CREATE TABLE Ticket(
	Id int auto_increment primary key NOT NULL,
	IdConta int NULL,
	IdContato int NULL,
	IdEmpresa int NULL,
	IdUsuarioCriacao int NULL,
	DataCriacao datetime NULL,
	IdUsuarioAlteracao int NULL,
	DataAlteracao datetime NULL,
	Token nvarchar(55) NULL,
	IdProprietario int NULL,
	IdStatus int NULL,
	HelthScore int NULL,
	IdStatusTicket int NULL,
	IdFila int NULL,
	IdModulo int NULL,
	Modulo varchar(255) NULL,
	DataConclusao datetime NULL,
	DptTicket varchar(50) NULL,
	DataVencimento datetime NULL
)

CREATE TABLE StatusTicket(
	Id int auto_increment primary key NOT NULL,
	IdConta int NULL,
	Ordem int NULL,
	Nome varchar(255) NULL,
	Color varchar(255) NULL,
	IdUsuarioCriacao int NULL,
	DataCriacao datetime NULL,
	IdUsuarioAlteracao int NULL,
	DataAlteracao datetime NULL,
	IsSistema bit NULL,
	Ativo bit NULL
)


CREATE TABLE `propriedaderespostaphone` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `IdPropriedade` int DEFAULT NULL,
  `IdConta` int DEFAULT NULL,
  `IdUser` int DEFAULT NULL,
  `Resposta` varchar(3000) DEFAULT NULL,
  `DataResposta` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `statusphone` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdConta` int DEFAULT NULL,
  `Ordem` int DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `IdUsuarioCriacao` int DEFAULT NULL,
  `DataCriacao` datetime DEFAULT NULL,
  `IdUsuarioAlteracao` int DEFAULT NULL,
  `DataAlteracao` datetime DEFAULT NULL,
  `IsSistema` bit(1) DEFAULT NULL,
  `Ativo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


SELECT propriedaderespostaticket.IdUser,
       MAX(CASE WHEN propriedade.Nome = 'Nome' THEN propriedaderespostaticket.Resposta END) AS Nome,
       MAX(CASE WHEN propriedade.Nome = 'Sobrenome' THEN propriedaderespostaticket.Resposta END) AS Sobrenome
from propriedadegrupo 
inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
left join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
GROUP BY propriedaderespostaticket.IdUser;

