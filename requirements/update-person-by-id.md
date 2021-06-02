# Atualizar uma pessoa pelo ID

> ## Caso de sucesso

1. Recebe uma requisição do tipo **PUT** na rota **/api/persons/{id}**
2. Valida dados obrigatórios **nome**, **data nascimento**, **país nascimento**, **estado nascimento**, **cidade nascimento** e **email**
3. Valida se o campo **email** é um e-mail válido
4. **Atualiza** uma pessoa com os dados fornecidos
5. Retorna **200** com os dados da pessoa

> ## Exceções

1. Retorna erro **404** se a API não existir
2. Retorna erro **400** se nome, data nascimento, país nascimento, estado nascimento ou cidade nascimento não forem fornecidos
3. Retorna erro **400** se o campo email for um e-mail inválido
4. Retorna erro **404** se o id fornecido for inválido
5. Retorna erro **500** se der erro ao tentar cadastrar a pessoa