import { Grid, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Book, BookCollectionFE, UserFE } from "../../../types"
import BookCard from "../components/Cards/BookCard"

const Home = () => {
  const [loggedInUserId, setLoggedInUserId] = useState('')

  const books: Book[] = useSelector((state: { books: { books: Book[] } }) => state.books.books)
  const user = useSelector((state: { user: UserFE }) => state.user.user?.user)
  const collection = useSelector((state: BookCollectionFE) => (state.bookCollection?.bookCollection))

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setLoggedInUserId(JSON.parse(loggedInUser).user.id)
    }
  }, [])

  return (
    <Grid>
      {!user ? (
        <Typography>
          Please <Link component="a" href="/login">Login</Link> or if You do not have an account <Link component="a" href="/register">Register</Link>
        </Typography>
      ) : (
        <Grid container component="div" direction={"row"} justifyContent="center" alignItems="center" spacing={2}>
          {books.length > 0 ? (
            books.map((book: Book) => {
              const isInCollection: boolean = collection.some((id) => id === book._id.toString())
              console.log(collection);

              return (
                <BookCard
                  key={book._id}
                  id={book._id.toString()}
                  title={book.title}
                  author={book.author}
                  isbn={book.isbn}
                  summary={book.summary}
                  genre={book.genre}
                  ownerId={user.id.toString()}
                  loggedInUserId={loggedInUserId}
                  isInCollectionCheck={isInCollection}
                />
              )
            })
          ) : (
            <Typography>
              There are no books yet.
            </Typography>
          )}
        </Grid >
      )}
    </Grid>
  )
}

export default Home