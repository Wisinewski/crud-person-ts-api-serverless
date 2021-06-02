export const personsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/person'
  }
}