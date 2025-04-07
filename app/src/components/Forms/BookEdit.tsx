import { Button, Grid, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../types";
import { useAppDispatch } from "../../../hooks/hooks";
import { editABook } from "../../api/reducers/bookReducer";

interface BookEditProps {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string[];
  isbn: string;
}

const BookEdit: React.FC<BookEditProps> = ({ id, title, author, summary, genre, isbn }) => {
  const [editTitle, setEditTitle] = useState(title)
  const [editAuthor, setEditAuthor] = useState(author)
  const [editSummary, setEditSummary] = useState(summary)
  const [editGenre, setEditGenre] = useState('')
  const [genreArray, setGenreArray] = useState<string[]>([...genre])
  const [editIsbn, setEditIsbn] = useState(isbn)
  const [owner, setOwner] = useState<User | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // Get logged in user id for owner field
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setOwner(JSON.parse(loggedInUserJSON))
    }
  }, [])

  const handleGenreAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (genre) {
      setGenreArray([...genreArray, editGenre])
      setEditGenre('')
    }
  }

  const handleBookEdit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!owner) {
      alert('Owner information is missing')
      return
    }

    const book = {
      _id: id,
      title: editTitle,
      author: editAuthor,
      summary: editSummary,
      genre: genreArray,
      isbn: editIsbn,
      owner,
    }
    try {
      await dispatch(editABook(book, id))
      alert('Book edited successfully')
      // Reset form fields after successful creation
      setEditTitle('')
      setEditAuthor('')
      setEditGenre('')
      setEditSummary('')
      setEditIsbn('')
      setGenreArray([])
    } catch (error) {
      console.error('Error editing book:', error)
      alert('Error editing book. Please try again.')
    }
  }

  return (
    <Grid container component="div" direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
      <h1>Create a Book</h1>
      <Grid>
        <TextField label="title" variant="outlined" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="author" variant="outlined" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="isbn" variant="outlined" value={editIsbn} onChange={(e) => setEditIsbn(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="summary" variant="outlined" value={editSummary} onChange={(e) => setEditSummary(e.target.value)} />
      </Grid>
      <Grid container direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
        <Grid>
          <TextField label="genre" variant="outlined" value={editGenre} onChange={(e) => setEditGenre(e.target.value)} />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleGenreAdd}>Add Genre</Button>
        </Grid>
        <Grid>
          <List>
            {genreArray.length > 0 ? (
              genreArray.map((g) => (
                <ListItem key={g}>
                  <ListItemText primary={g} />
                </ListItem>
              ))
            ) : (<></>)}
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleBookEdit}>Edit Book</Button>
    </Grid>
  )
}

export default BookEdit