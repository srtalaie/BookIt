import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Book, UserFE } from "../../../types"
import BookCard from "../components/Cards/BookCard"

const Home = () => {
  const [loggedInUserId, setLoggedInUserId] = useState('')

  const books: Book[] = useSelector((state: { books: { books: Book[] } }) => state.books.books)
  const user = useSelector((state: { user: UserFE }) => state.user.user.user)

  console.log(books);


  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setLoggedInUserId(JSON.parse(loggedInUser).user.id)
    }
  }, [])

  return (
    <Grid container component="div" direction={"row"} justifyContent="center" alignItems="center" spacing={2}>
      {books.length > 0 ? (
        books.map((book: Book) => (
          <BookCard
            id={book.id}
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            summary={book.summary}
            genre={book.genre}
            ownerId={user.id.toString()}
            loggedInUserId={loggedInUserId}
          />
        ))
      ) : (
        <Typography>There are no books yet.</Typography>
      )}
    </Grid>
  )
}

export default Home