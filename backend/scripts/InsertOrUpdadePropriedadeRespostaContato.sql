CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertOrUpdatePropriedadeRespostaContato`(
    IN p_IdPropriedade INT,
    IN p_IdConta INT,
    IN p_IdUser INT,
    IN p_Resposta VARCHAR(3000)
)
BEGIN
    DECLARE existingId INT;

    -- Check if record with given IdPropriedade exists
    SELECT Id INTO existingId
    FROM propriedaderespostaticket
    WHERE 
		IdPropriedade = p_IdPropriedade
        and IdUser = p_IdUser;

    -- If record exists, update it; otherwise, insert a new record
    IF existingId IS NOT NULL THEN
        -- Update existing record
        UPDATE propriedaderespostaticket
        SET 
            Resposta = p_Resposta,
            DataResposta = now()
        WHERE IdPropriedade = p_IdPropriedade
			and IdUser = p_IdUser;
    ELSE
        -- Insert new record
        INSERT INTO propriedaderespostaticket (IdPropriedade, IdConta, IdUser, Resposta, DataResposta)
        VALUES (p_IdPropriedade, p_IdConta, p_IdUser, p_Resposta, now());
    END IF;
END