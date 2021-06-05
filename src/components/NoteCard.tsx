import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { blue, green, red, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    background: (note: any) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "reminders") {
        return green[500];
      }
      if (note.category === "todos") {
        return red[500];
      }
      return blue[500];
    },
  },
});

const NoteCard = ({ note, handleDelete }: { note: any; handleDelete: any }) => {
  const classes = useStyles(note);

  return (
    <div>
      {note ? (
        <Card elevation={4}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {note.category[0].toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton onClick={() => handleDelete(note.id)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={note.title}
            subheader={note.category}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {note.details}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No notes, add some!</Typography>
      )}
    </div>
  );
};

export default NoteCard;
