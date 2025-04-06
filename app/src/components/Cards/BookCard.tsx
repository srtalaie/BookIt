import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string[];
  isbn: string;
  ownerId: string;
  loggedInUserId: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, summary, genre, isbn, ownerId, loggedInUserId, }) => {
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    // Check if logged in user is owner of displayed book
    if (ownerId === loggedInUserId) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [ownerId, loggedInUserId])

  const handleBookDelete = async () => {
    if () 
  }

  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="placeholder"
        height="140"
        image="https://source.unsplash.com/random/800x600/?book"
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
              <Button key={g} variant="outlined" size="small">{g}</Button>
            ))}
          </Stack>
        ) : (<></>)}
      </CardContent>
      <CardActions>
        <Button size="small">Add to Collection</Button>
        {isOwner ? (
          <div>
            <Button size="small"><Link to={`/edit-book/${id}`}></Link></Button>
            <Button size="small">Delete</Button>
          </div>
        ) : (<></>)}
      </CardActions>
    </Card>
  )
}

export default BookCard