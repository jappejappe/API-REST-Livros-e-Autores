# Design Document

## Overview

The Book and Author Inventory system follows a three-tier architecture with a Node.js/Express REST API backend, React frontend, and in-memory data storage. The system emphasizes modular design to support team-based development with clear separation of concerns between Authors and Books controllers, and a dedicated service layer for frontend-backend communication.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    HTTP/REST     ┌─────────────────┐    In-Memory     ┌─────────────────┐
│   React Client  │ ◄──────────────► │  Express Server │ ◄──────────────► │   Data Arrays   │
│                 │                  │                 │                  │                 │
│ - Components    │                  │ - Controllers   │                  │ - books[]       │
│ - Service Layer │                  │ - Routes        │                  │ - authors[]     │
│ - State Mgmt    │                  │ - Middleware    │                  │                 │
└─────────────────┘                  └─────────────────┘                  └─────────────────┘
```

### Backend Architecture

```
Express Application
├── app.js (main application setup)
├── routes/
│   ├── books.js (book routes)
│   └── authors.js (author routes)
├── controllers/
│   ├── bookController.js (full CRUD)
│   └── authorController.js (simple CRUD)
├── models/
│   ├── Book.js (book data model)
│   └── Author.js (author data model)
├── data/
│   └── storage.js (in-memory arrays)
└── middleware/
    └── validation.js (request validation)
```

### Frontend Architecture

```
React Application
├── src/
│   ├── components/
│   │   ├── books/
│   │   │   ├── BookList.jsx
│   │   │   ├── BookForm.jsx
│   │   │   └── BookDetail.jsx
│   │   └── authors/
│   │       ├── AuthorList.jsx
│   │       └── AuthorForm.jsx
│   ├── services/
│   │   ├── bookService.js
│   │   └── authorService.js
│   ├── hooks/
│   │   └── useApi.js
│   └── App.jsx
```

## Components and Interfaces

### Data Models

#### Book Model
```javascript
{
  id: string (UUID),
  title: string (required),
  isbn: string (optional),
  publishedYear: number (optional),
  authorId: string (required, references Author),
  genre: string (optional),
  description: string (optional),
  createdAt: Date,
  updatedAt: Date
}
```

#### Author Model
```javascript
{
  id: string (UUID),
  name: string (required),
  biography: string (optional),
  birthYear: number (optional),
  nationality: string (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

#### Books API (Full CRUD)
- `GET /api/books` - List all books with author information
- `POST /api/books` - Create new book
- `GET /api/books/:id` - Get specific book with author details
- `PUT /api/books/:id` - Update existing book
- `DELETE /api/books/:id` - Delete book

#### Authors API (Simple CRUD)
- `GET /api/authors` - List all authors
- `POST /api/authors` - Create new author
- `GET /api/authors/:id` - Get specific author
- `PUT /api/authors/:id` - Update existing author
- `DELETE /api/authors/:id` - Delete author

### Response Formats

#### Success Response
```javascript
{
  success: true,
  data: <resource_data>,
  message: "Operation completed successfully"
}
```

#### Error Response
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message",
    details: <additional_error_info>
  }
}
```

### Controller Interfaces

#### Book Controller Methods
- `getAllBooks()` - Returns books with populated author information
- `createBook(bookData)` - Validates and creates new book
- `getBookById(id)` - Returns book with author details
- `updateBook(id, bookData)` - Updates existing book (PUT semantics)
- `deleteBook(id)` - Removes book from inventory

#### Author Controller Methods
- `getAllAuthors()` - Returns all authors
- `createAuthor(authorData)` - Creates new author
- `getAuthorById(id)` - Returns specific author
- `updateAuthor(id, authorData)` - Updates existing author (PUT semantics)
- `deleteAuthor(id)` - Removes author

### Frontend Service Layer

#### Book Service
```javascript
class BookService {
  async getAllBooks()
  async createBook(bookData)
  async getBookById(id)
  async updateBook(id, bookData)
  async deleteBook(id)
}
```

#### Author Service
```javascript
class AuthorService {
  async getAllAuthors()
  async createAuthor(authorData)
  async getAuthorById(id)
  async updateAuthor(id, authorData)
  async deleteAuthor(id)
}
```

## Data Models

### In-Memory Storage Structure

```javascript
// data/storage.js
const storage = {
  books: [],
  authors: [],
  
  // Helper methods
  generateId: () => crypto.randomUUID(),
  findBookById: (id) => books.find(book => book.id === id),
  findAuthorById: (id) => authors.find(author => author.id === id)
};
```

### Data Relationships

- Books have a required `authorId` field that references an Author
- Authors can have multiple books (one-to-many relationship)
- When retrieving books, author information is populated
- Author deletion should check for existing book references

### Validation Rules

#### Book Validation
- `title`: Required, string, 1-200 characters
- `authorId`: Required, must reference existing author
- `isbn`: Optional, valid ISBN format if provided
- `publishedYear`: Optional, valid year between 1000-current year
- `genre`: Optional, string, max 50 characters

#### Author Validation
- `name`: Required, string, 1-100 characters
- `birthYear`: Optional, valid year between 1000-current year
- `nationality`: Optional, string, max 50 characters
- `biography`: Optional, string, max 1000 characters

## Error Handling

### Error Categories

1. **Validation Errors (400)**
   - Missing required fields
   - Invalid data formats
   - Business rule violations

2. **Not Found Errors (404)**
   - Resource doesn't exist
   - Invalid ID provided

3. **Conflict Errors (409)**
   - Attempting to delete author with existing books
   - Duplicate ISBN (if implemented)

4. **Server Errors (500)**
   - Unexpected application errors
   - Memory operation failures

### Error Handling Strategy

#### Backend Error Handling
- Global error middleware to catch and format errors
- Specific error classes for different error types
- Consistent error response format
- Logging for debugging purposes

#### Frontend Error Handling
- Service layer catches and transforms API errors
- User-friendly error messages in UI
- Loading states and error boundaries
- Retry mechanisms for transient failures

## Testing Strategy

### Backend Testing

#### Unit Tests
- Controller method testing with mocked data
- Model validation testing
- Utility function testing
- Error handling scenarios

#### Integration Tests
- Full API endpoint testing
- Request/response validation
- Error response testing
- Data persistence verification

### Frontend Testing

#### Component Tests
- React component rendering
- User interaction testing
- Props and state management
- Error state handling

#### Service Layer Tests
- API call mocking
- Error handling verification
- Data transformation testing

#### End-to-End Tests
- Complete user workflows
- CRUD operation flows
- Error scenario handling
- Cross-browser compatibility

### Test Data Strategy

- Predefined test datasets for consistent testing
- Factory functions for generating test data
- Cleanup procedures for test isolation
- Mock API responses for frontend testing

### Testing Tools

- **Backend**: Jest, Supertest for API testing
- **Frontend**: Jest, React Testing Library, MSW for API mocking
- **E2E**: Cypress or Playwright for full workflow testing