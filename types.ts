export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisteringUser {
  name: string;
  email: string;
  password: string;
}

export interface Book {
  _id: string;
  isbn: string;
  title: string;
  author: string;
  genre: string[];
  summary: string;
  owner: User;
}

export interface BookCreate {
  isbn: string;
  title: string;
  author: string;
  genre: string[];
  summary: string;
  owner: User;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  bookCollection: Book[];
}

export interface Credentials {
  email: string;
  password: string;
}

export interface BookCollectionState {
  bookCollection: Book[];
}

export interface NavItems {
  text: string;
  loc: string;
}

export interface UserFE {
  user: {
    user: Profile
  }
}

export interface BooksFE {
  books: {
    books: Book[]
  }
}

export interface BookFE {
  book: {
    book: Book
  }
}

export interface BookCollectionFE {
  bookCollection: {
    bookCollection: string[]
  }
}