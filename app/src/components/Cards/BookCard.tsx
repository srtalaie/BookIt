import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { addABookToCollection, deleteBookThunk, removeABookFromCollection } from "../../api/reducers/bookCollReducer";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string[];
  isbn: string;
  ownerId: string;
  loggedInUserId: string;
  isInCollectionCheck: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, summary, genre, isbn, ownerId, loggedInUserId, isInCollectionCheck }) => {
  const [isOwner, setIsOwner] = useState(false)
  const [isInCollection, setIsinCollection] = useState(isInCollectionCheck)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // Check if logged in user is owner of displayed book
    if (ownerId === loggedInUserId) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [ownerId, loggedInUserId])

  const handleBookDelete = async () => {
    try {
      await dispatch(deleteBookThunk(id))
      alert('Book was deleted successfully')
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again later.');
    }
  }

  const handleAddBookToCollection = async () => {
    try {
      await dispatch(addABookToCollection(id))
      setIsinCollection(!isInCollection)
      alert('Book added to collection successfully')
    } catch (error) {
      console.error('Error adding book to collection:', error);
      alert('Error adding book to collection. Please try again later.');

    }
  }

  const handleRemoveBookFromCollection = async () => {
    try {
      await dispatch(removeABookFromCollection(id))
      alert('Book removed from collection successfully')
      setIsinCollection(!isInCollection)
    } catch (error) {
      console.error('Error removing book from collection:', error);
      alert('Error removing book from collection. Please try again later.');
    }
  }


  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="placeholder"
        height="140"
        image="https://picsum.photos/400/300"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {author}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {isbn}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {summary}
        </Typography>
        {genre.length > 0 ? (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {genre.map((g) => (
              <Chip key={g} variant="outlined" label={g} />
            ))}
          </Stack>
        ) : (<></>)}
      </CardContent>
      <CardActions>
        {isInCollection ? (
          <Button size="small" color="error" onClick={handleRemoveBookFromCollection}>Remove from Collection</Button>
        ) : (
          <Button size="small" color="success" onClick={handleAddBookToCollection}>Add to Collection</Button>
        )}
        {isOwner ? (
          <div>
            <Button size="small" color="primary"><Link to={`/edit-book/${id}`}>Edit</Link></Button>
            <Button size="small" color="error" onClick={handleBookDelete}>Delete</Button>
          </div>
        ) : (<></>)}
      </CardActions>
    </Card>
  )
}

export default BookCard