const { storageHelpers } = require('./storage');

// Dados iniciais para demonstração
const seedData = () => {
  // Adicionar alguns autores de exemplo
  const author1 = storageHelpers.addAuthor({
    name: 'Machado de Assis',
    biography: 'Joaquim Maria Machado de Assis foi um escritor brasileiro, considerado por muitos críticos, estudiosos, escritores e leitores um dos maiores senão o maior nome da literatura brasileira.',
    birthYear: 1839,
    nationality: 'Brasileiro'
  });

  const author2 = storageHelpers.addAuthor({
    name: 'Clarice Lispector',
    biography: 'Clarice Lispector foi uma escritora e jornalista brasileira nascida na Ucrânia. Autora de romances, contos e ensaios, é considerada uma das escritoras brasileiras mais importantes do século XX.',
    birthYear: 1920,
    nationality: 'Brasileira'
  });

  const author3 = storageHelpers.addAuthor({
    name: 'Paulo Coelho',
    biography: 'Paulo Coelho de Souza é um romancista, jornalista, dramaturgo, letrista e escritor brasileiro. É o escritor brasileiro mais vendido de todos os tempos.',
    birthYear: 1947,
    nationality: 'Brasileiro'
  });

  // Adicionar alguns livros de exemplo
  storageHelpers.addBook({
    title: 'Dom Casmurro',
    summary: 'Romance narrado em primeira pessoa por Bento Santiago, que conta a história de seu amor por Capitu e suas suspeitas sobre a traição dela com seu melhor amigo Escobar.',
    authorId: author1.id,
    publishedYear: 1899,
    genre: 'Romance',
    quality: '5',
    pages: 256,
    language: 'Português',
    publisher: 'Garnier',
    isbn: '978-85-254-0123-4'
  });

  storageHelpers.addBook({
    title: 'A Hora da Estrela',
    summary: 'A história de Macabéa, uma jovem alagoana que vive no Rio de Janeiro. Através de sua narrativa simples e tocante, Clarice explora temas como solidão, pobreza e a busca por identidade.',
    authorId: author2.id,
    publishedYear: 1977,
    genre: 'Romance',
    quality: '5',
    pages: 87,
    language: 'Português',
    publisher: 'Rocco'
  });

  storageHelpers.addBook({
    title: 'O Alquimista',
    summary: 'A jornada de Santiago, um jovem pastor andaluz que viaja do sul da Espanha ao Egito em busca de um tesouro. Uma fábula sobre seguir os próprios sonhos e ouvir o coração.',
    authorId: author3.id,
    publishedYear: 1988,
    genre: 'Ficção',
    quality: '4',
    pages: 163,
    language: 'Português',
    publisher: 'Planeta',
    isbn: '978-85-422-0041-4'
  });

  console.log('✅ Dados iniciais carregados com sucesso!');
  console.log(`📚 ${storageHelpers.getAllBooks().length} livros cadastrados`);
  console.log(`✍️ ${storageHelpers.getAllAuthors().length} autores cadastrados`);
};

module.exports = { seedData };