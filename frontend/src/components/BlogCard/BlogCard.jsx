import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import { Link } from "react-router-dom";

export default function BlogCard({
    title = "Title of the blog!",
    author = "Author",
    date = "08-Oct-2024",
    content = "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id = "#",
    coverImage

}) {

    const fetchedHtmlContent = content;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fetchedHtmlContent;
    const plainText = tempDiv.innerText || tempDiv.textContent;

    return (
        <Card sx={{ minWidth: 275, marginBottom: 2.5 }} >
            <Box sx={{ display: "flex" }} >
                <CardMedia sx={{ width: 400, borderRadius: "1%" }}
                    component="img"
                    height="250"
                    image={coverImage === "" ? "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" : coverImage}
                    alt="Image here!"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }} >
                    <CardContent sx={{ marginLeft: 3, height: 180, width: 700 }} >
                        <Typography variant="h4" component="div">
                            {title}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5, mt: 1.5 }} >
                            <Typography sx={{ color: "text.secondary" }}>
                                {author}
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                {date}
                            </Typography>
                        </Box>
                        <Typography component="div" variant="body2" sx={{ height: 84, overflowY: "clip" }}>
                            <div dangerouslySetInnerHTML={{ __html: plainText }} />
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ marginLeft: 4, mt: 1 }}>
                        <Button component={Link} to={`/blogs/${id}`} variant="contained" size="small" >Learn More</Button>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
};