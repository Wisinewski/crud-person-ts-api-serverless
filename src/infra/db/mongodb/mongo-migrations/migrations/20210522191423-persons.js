module.exports = {
  async up(db, client) {
    await db.collection('persons').insertMany([{
      nome: 'Eloá Emily Almeida',
      cpf: '56726002041',
      dataNascimento: new Date('1952-03-06'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'MG',
      cidadeNascimento: 'Varginha',
      email: 'eloaemilyalmeida-87@diebold.com',
      nomePai: 'Theo Thales Almeida',
      nomeMae: 'Giovana Louise'
    }, {
      nome: 'Fabiana Benedita Rodrigues',
      cpf: '63887857607',
      dataNascimento: new Date('1977-01-19'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'TO',
      cidadeNascimento: 'Gurupi',
      email: 'fabianabeneditarodrigues-83@igi.com.br',
      nomePai: 'Augusto Thiago Rodrigues',
      nomeMae: 'Raquel Isabelly'
    }, {
      nome: 'Beatriz Vitória da Cunha',
      cpf: '50884906663',
      dataNascimento: new Date('1970-07-10'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'AP',
      cidadeNascimento: 'Macapá',
      email: 'beatrizvitoriadacunha_@bluespropaganda.com',
      nomePai: 'Ian Vicente Daniel da Cunha',
      nomeMae: 'Laura Lara'
    }, {
      nome: 'Vicente Felipe Anthony Rodrigues',
      cpf: '07104373667',
      dataNascimento: new Date('1982-10-19'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'SP',
      cidadeNascimento: 'São Paulo',
      email: 'vicentefelipeanthonyrodrigues-74@orbisat.com.br',
      nomePai: 'Bernardo Benício Igor Rodrigues',
      nomeMae: 'Antonella Stefany'
    }, {
      nome: 'Aurora Cristiane Clara dos Santos',
      cpf: '38938277224',
      dataNascimento: new Date('2003-03-25'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'ES',
      cidadeNascimento: 'Cariacica',
      email: 'auroracristianeclaradossantos__auroracristianeclaradossantos@yahho.com.br',
      nomePai: 'Gustavo André Benedito dos Santos',
      nomeMae: 'Priscila Laura Eloá'
    }, {
      nome: 'Cecília Luzia Assunção',
      cpf: '04612574591',
      dataNascimento: new Date('1977-03-18'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'RN',
      cidadeNascimento: 'Natal',
      email: 'ccecilialuziaassuncao@negocios-de-valor.com',
      nomePai: 'Raimundo Henrique Paulo Assunção',
      nomeMae: 'Mariah Eliane'
    }, {
      nome: 'Teresinha Juliana Adriana Farias',
      cpf: '78892252291',
      dataNascimento: new Date('1952-06-14'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'SP',
      cidadeNascimento: 'Piracicaba',
      email: 'tteresinhajulianaadrianafarias@vectrausinagem.com.br',
      nomePai: 'Luís Emanuel Farias',
      nomeMae: 'Elza Hadassa Luzia'
    }, {
      nome: 'Carlos Bernardo Peixoto',
      cpf: '36678191021',
      dataNascimento: new Date('1983-09-09'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'TO',
      cidadeNascimento: 'Araguaína',
      email: 'ccarlosbernardopeixoto@isometro.com.br',
      nomePai: 'Calebe Tomás Nicolas Peixoto',
      nomeMae: 'Laura Gabriela Mariane'
    }, {
      nome: 'Elias Nelson Alves',
      cpf: '46462367377',
      dataNascimento: new Date('1961-01-09'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'ES',
      cidadeNascimento: 'Vila Velha',
      email: 'eliasnelsonalves-75@ppconsulting.com.br',
      nomePai: 'Kaique Bernardo Alves',
      nomeMae: 'Lúcia Isabelle'
    }, {
      nome: 'Daniela Joana da Mata',
      cpf: '88152602779',
      dataNascimento: new Date('1982-08-23'),
      paisNascimento: 'Brasil',
      estadoNascimento: 'PA',
      cidadeNascimento: 'Belém',
      email: 'ddanielajoanadamata@unimedsjc.com.br',
      nomePai: 'Kaique Samuel da Mata',
      nomeMae: 'Renata Agatha Aurora'
    }]);
  },

  async down(db, client) {
    await db.collection('persons').deleteMany({})
  }
};
