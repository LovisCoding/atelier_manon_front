import React from "react";
import { Box, Typography, Link, Grid2, Stack } from "@mui/material";
import ImgMui from './ImgMui';
const InstagramPNG = '../src/assets/img/instagram.webp';



function Footer() {

    const linkStyle = {
        color: 'black',
        textDecorationColor: 'black',
        textDecoration:'underline',
        cursor:'pointer'
    }

    return (
        <Stack
            container
            width="100%"
            columns={{ xs: 3, sm: 8, md: 12 }}
            sx={{ padding: "1rem", margin: 0, fontSize: '12px', marginTop:'auto' }}
            bgcolor="#F8F8F8"
            color="black"
            spacing={5}
            
        >
            <Box >
                <Grid2 container columns={{xs:2, sm:8, md:12}} spacing={3} paddingTop="1rem" >
                    <Grid2 item size={{xs: 2, sm: 8, md: 5}} display="flex" flexDirection="column" justifyContent="center" >
                        <Stack width="100%" >
                            <Stack padding="0rem 0 1rem 3rem" >EN SAVOIR PLUS</Stack>
                            <Stack display="flex" flexDirection="column" justifyContent="center" gap=".3rem" >
                                <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} sx={{ padding: '0 3rem' }} >
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} margin="0 auto" ><Link sx={linkStyle} href="/" >Colliers</Link></Grid2>
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} margin="0 auto" ><Link sx={linkStyle} href="/" >FAQ</Link></Grid2>
                                </Grid2>
                                <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} sx={{ padding: '0 3rem' }} >
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} ><Link sx={linkStyle} href="/" >Bracelets</Link></Grid2>
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} ><Link sx={linkStyle} href="/" >Contact</Link></Grid2>
                                </Grid2>
                                <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} sx={{ padding: '0 3rem' }} >
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} ><Link sx={linkStyle} href="/" >A propos</Link></Grid2>
                                    <Grid2 item size={{ xs: 1, sm: 4, md: 6 }} ><Link sx={linkStyle} href="/" >Blog</Link></Grid2>
                                </Grid2>
                            </Stack>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{xs:0, sm:0, md:2}} ></Grid2>
                    <Grid2 item size={{xs: 2, sm: 8, md: 5}} paddingLeft={2} display="flex" flexDirection="column" alignItems="start" justifyContent="center" gap="1rem" >
                        <Typography sx={{ fontSize: '12px' }} >ME SUIVRE</Typography>
                        <Typography sx={{ fontSize: '12px' }} >Rejoignez moi sur Instagram pour me partager vos compositions de bijoux !</Typography>
                        <Box sx={{ justifySelf: 'center', display: 'flex', alignItems: 'center', alignSelf: 'center', bgcolor: "#FE005C", width: 'fit-content', height: 'fit-content', borderRadius: '20px' }}>
                            <ImgMui src={InstagramPNG} sx={{ width: '30px', height: 'auto' }} />
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
            <Box display="flex" alignItems="end" justifyContent="center" gap="1rem" >
                <Link sx={linkStyle} href="/cgv" >CGV</Link>
                <Link sx={linkStyle} href="/" >Mentions légales</Link>
            </Box>
        </Stack>
    )

}

export default Footer;
