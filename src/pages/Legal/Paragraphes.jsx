import { Stack, Typography } from '@mui/material';
import CGVBody from './CGVBody.json';


const LegalMentionsParagraphs = () => {

	return (
		<>
			{CGVBody.map((paragraphe, index) => (
				<Stack key={index} mt={3}>
					<Typography variant={'h6'}>{(index+1) + '. ' +paragraphe.title}</Typography>
					<Typography variant={'body1'} mt={2}>
						{paragraphe.content}
					</Typography>
				</Stack>
			))}
		</>
		
	)
}

export default LegalMentionsParagraphs;