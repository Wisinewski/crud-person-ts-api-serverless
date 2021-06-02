# Deletar uma pessoa pelo ID

> ## Caso de sucesso

1. Recebe uma requisição do tipo **DELETE** na rota **/api/persons/{id}**
2. Retorna **204**

> ## Exceções

1. Retorna erro **404** se a API não existir
2. Retorna erro **400** se o campo ID for um ID inválido
3. Retorna erro **404** se não encontrar uma pessoa com o ID fornecido
4. Retorna erro **500** se der erro ao tentar deletar a pessoa