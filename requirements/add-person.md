# Adicionar uma pessoa

> ## Caso de sucesso

1. Recebe uma requisição do tipo **POST** na rota **/api/persons**
2. Valida dados obrigatórios **nome**, **CPF**, **data nascimento**, **país nascimento**, **estado nascimento**, **cidade nascimento** e **email**
3. Valida se o campo **CPF** é um CPF válido
4. Valida se já existe uma pessoa com o **CPF** fornecido
5. Valida se o campo **email** é um e-mail válido
6. **Cadastra** uma pessoa com os dados fornecidos
7. Retorna **201** com os dados da pessoa

> ## Exceções

1. Retorna erro **404** se a API não existir
2. Retorna erro **400** se nome, CPF, data nascimento, país nascimento, estado nascimento ou cidade nascimento não forem fornecidos
3. Retorna erro **400** se o campo CPF for um CPF inválido
4. Retorna erro **400** se o campo email for um e-mail inválido
5. Retorna erro **409** se o CPF fornecido já estiver em uso
6. Retorna erro **500** se der erro ao tentar cadastrar a pessoa