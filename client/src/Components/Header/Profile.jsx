import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';

const StyledMenu = styled(Menu)`
    margin-top: 5px;
`;

const LogoutText = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAccount('');
        handleClose(); // Ensure the menu closes after logout
    };

    return (
        <>
            <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
                <Typography style={{ marginTop: 2 }}>{account}</Typography>
            </Box>
            <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout}>
                    <PowerSettingsNew fontSize='small' color='primary' />
                    <LogoutText>Logout</LogoutText>
                </MenuItem>
            </StyledMenu>
        </>
    );
};

export default Profile;
