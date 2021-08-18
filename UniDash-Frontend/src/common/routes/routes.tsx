import * as React from 'react';
import { Box, Typography } from '@material-ui/core';

const NotFound: React.FC = () => {
    return (
        <Box textAlign="center">
            <Typography gutterBottom variant="h1">
        Page Not Found
            </Typography>
            <Typography variant="h6">
        The page you are looking for does not exist.
            </Typography>
        </Box>
    );
};
export default NotFound;
