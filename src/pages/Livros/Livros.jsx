import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
`;

const SecondaryNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SelectedBookInfo = styled.div`
  color: #333;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #61dafb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  `}
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const BookAuthor = styled.p`
  color: #555;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const Livros = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // State for new book details
  const [newBook, setNewBook] = useState({
    nome: '',
    autor: '',
    editora: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/livros');
        const data = await response.json();
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle new book input changes
  const handleNewBookChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModifyClick = () => {
    if (selectedBook) {
      setIsModifyModalOpen(true);
    } else {
      alert('Selecione um livro para alterar.');
    }
  };

  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
  };

  const handleAddBookClick = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveClick = async () => {
    if (!selectedBook || !selectedBook._id) return;

    try {
      const response = await fetch(`http://localhost:3000/livros/${selectedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: selectedBook.nome,
          autor: selectedBook.autor,
          editora: selectedBook.editora,
        }),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === updatedBook._id ? updatedBook : book
          )
        );
        alert('Livro atualizado com sucesso!');
        closeModifyModal();
      } else {
        alert('Erro ao atualizar o livro.');
      }
    } catch (error) {
      console.error('Erro ao fazer o PUT request:', error);
      alert('Erro ao atualizar o livro.');
    }
  };

  const handleNewBookSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const createdBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, createdBook]);
        alert('Livro adicionado com sucesso!');
        closeAddModal();
        // Reset the new book state
        setNewBook({ nome: '', autor: '', editora: '' });
      } else {
        alert('Erro ao adicionar o livro.');
      }
    } catch (error) {
      console.error('Erro ao fazer o POST request:', error);
      alert('Erro ao adicionar o livro.');
    }
  };

  // Handle delete book
  const handleDeleteClick = async () => {
    if (!selectedBook || !selectedBook._id) return;

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir "${selectedBook.nome}"?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/livros/${selectedBook._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== selectedBook._id));
          alert('Livro excluído com sucesso!');
          setSelectedBook(null); // Clear selected book
        } else {
          alert('Erro ao excluir o livro.');
        }
      } catch (error) {
        console.error('Erro ao fazer o DELETE request:', error);
        alert('Erro ao excluir o livro.');
      }
    }
  };

  return (
    <PageContainer>
      <SecondaryNavbar>
        <SelectedBookInfo>
          {selectedBook ? `Selecionado: ${selectedBook.nome} (ID: ${selectedBook._id})` : 'Nenhum livro selecionado'}
        </SelectedBookInfo>

        <ButtonGroup>
          <Button onClick={handleAddBookClick}>Incluir</Button>
          <Button onClick={handleDeleteClick} disabled={!selectedBook}>
            Excluir
          </Button>
          <Button onClick={handleModifyClick} disabled={!selectedBook}>
            Alterar
          </Button>
        </ButtonGroup>
      </SecondaryNavbar>

      <CardContainer>
        {books.map((book) => (
          <Card
            key={book._id}
            onClick={() => handleCardClick(book)}
            isSelected={selectedBook && selectedBook._id === book._id}
          >
            <BookTitle>{book.nome}</BookTitle>
            <BookAuthor>{book.autor}</BookAuthor>
          </Card>
        ))}
      </CardContainer>

      {/* Modify Modal */}
      {isModifyModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>Modificar Livro</h2>
            <Label>Nome:</Label>
            <Input
              type="text"
              name="nome"
              value={selectedBook.nome}
              onChange={handleInputChange}
            />
            <Label>Autor:</Label>
            <Input
              type="text"
              name="autor"
              value={selectedBook.autor}
              onChange={handleInputChange}
            />
            <Label>Editora:</Label>
            <Input
              type="text"
              name="editora"
              value={selectedBook.editora}
              onChange={handleInputChange}
            />
            <Button onClick={handleSaveClick}>Salvar</Button>
            <CloseButton onClick={closeModifyModal}>Fechar</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>Adicionar Livro</h2>
            <Label>Nome:</Label>
            <Input
              type="text"
              name="nome"
              value={newBook.nome}
              onChange={handleNewBookChange}
            />
            <Label>Autor:</Label>
            <Input
              type="text"
              name="autor"
              value={newBook.autor}
              onChange={handleNewBookChange}
            />
            <Label>Editora:</Label>
            <Input
              type="text"
              name="editora"
              value={newBook.editora}
              onChange={handleNewBookChange}
            />
            <Button onClick={handleNewBookSubmit}>Adicionar</Button>
            <CloseButton onClick={closeAddModal}>Fechar</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Livros;
