import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../api/services/bookService';
import BookEdit from '../components/Forms/BookEdit';

interface Book {
  _id: string;
  author: string;
  isbn: string;
  summary: string;
  genre: string[];
  title: string;
}

const EditBookPage = () => {
  const [bookInfo, setBookInfo] = useState<Book | null>(null)

  const { bookId } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        const fetchedBook = await getBook(bookId)
        setBookInfo(fetchedBook)
      } else {
        console.error('bookId is undefined')
      }
    }
    fetchBook()
  }, [bookId])

  return (
    <>
      {bookInfo ? (
        <BookEdit
          id={bookInfo._id}
          title={bookInfo.title}
          author={bookInfo.author}
          isbn={bookInfo.isbn}
          summary={bookInfo.summary}
          genre={bookInfo.genre}
        />
      ) : null}
    </>
  )
}

export default EditBookPage