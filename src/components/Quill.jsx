import { Box, Typography } from "@mui/material";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function Quill({title, message, setMessage}) {
	return (
	<Box>
		<Typography variant="h6" gutterBottom>
			{title}
		</Typography>
		<ReactQuill
			className="overflowReactQuill"
			theme="snow"
			value={message}
			onChange={setMessage}
			placeholder="Écrivez la page ici..."
			modules={{
				clipboard: {
					matchVisual: false
				}
			}
			}
		/>
	</Box>
	)
}