# Carregar pessoas por filtro

> ## Caso de sucesso

1. Recebe uma requisição do tipo **GET** na rota **/api/persons**
2. Aplicar os filtros **nome**, **CPF**, **data**, **pais**, **estado** ou **cidade** fornecidos
3. Retorna **200** com os dados das pessoas

> ## Exceções

2. Retorna erro **404** se a API não existir
3. Retorna erro **500** se der erro ao tentar retornar os dados da pessoa