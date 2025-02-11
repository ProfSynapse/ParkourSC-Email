import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface EmailPreviewProps {
    content: string;
}

export const EmailPreview = ({ content }: EmailPreviewProps) => {
    const theme = useTheme();

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(content);
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                        mb: 0
                    }}
                >
                    Email Preview
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopyHtml}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        }
                    }}
                >
                    Copy HTML
                </Button>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    backgroundColor: 'white'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '600px',
                        overflow: 'auto',
                        '& iframe': {
                            border: 'none',
                            width: '100%',
                            height: '100%'
                        }
                    }}
                    dangerouslySetInnerHTML={{ __html: `<iframe srcdoc="${content.replace(/"/g, '&quot;')}" />` }}
                />
            </Paper>
        </Box>
    );
};
