DELIMITER //

CREATE PROCEDURE `InsertOrUpdatePropriedadeRespostaphone`(
    IN p_IdPropriedade INT,
    IN p_IdConta INT,
    IN p_IdUser INT,
    IN p_Resposta VARCHAR(3000)
)
BEGIN
    DECLARE existingId INT;

    -- For example, check if the record exists in a table, e.g., PropriedadeResposta
    SELECT Id INTO existingId
    FROM propriedaderespostaphone
    WHERE IdPropriedade = p_IdPropriedade
      AND IdConta = p_IdConta
      AND IdUser = p_IdUser
    LIMIT 1;

    -- If the record exists, update it; otherwise, insert a new one
    IF existingId IS NOT NULL THEN
        UPDATE propriedaderespostaphone
        SET Resposta = p_Resposta
        WHERE Id = existingId;
    ELSE
        INSERT INTO propriedaderespostaphone (IdPropriedade, IdConta, IdUser, Resposta)
        VALUES (p_IdPropriedade, p_IdConta, p_IdUser, p_Resposta);
    END IF;
END //

DELIMITER ;