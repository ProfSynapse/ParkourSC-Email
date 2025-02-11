import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Snackbar,
    useTheme,
    Stack,
    Button,
    Tooltip,
    Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { EmailTemplate } from '../types/email';

interface EmailPreviewProps {
    template: EmailTemplate;
    content: string;
}

export const EmailPreview = ({ template, content }: EmailPreviewProps) => {
    const [showCopied, setShowCopied] = useState(false);
    const [copiedType, setCopiedType] = useState<'subject' | 'body'>('body');
    const theme = useTheme();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleCopy = async (text: string, type: 'subject' | 'body') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedType(type);
            setShowCopied(true);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const formattedSubject = template.subject.replace(/\{([^}]+)\}/g, (_, key) => {
        const match = content.match(new RegExp(`{${key}}`, 'g'));
        return match ? match[0] : `{${key}}`;
    });

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument;
            if (doc) {
                doc.open();
                doc.write(content);
                doc.close();
            }
        }
    }, [content]);

    const IconShape = ({ type }: { type: 'checkmark' | 'exclamation' | 'question' }) => {
        const getIconContent = () => {
            switch (type) {
                case 'checkmark':
                    return { icon: <CheckIcon sx={{ fontSize: 40 }} />, color: '#012160' };
                case 'exclamation':
                    return { icon: <ErrorOutlineIcon sx={{ fontSize: 40 }} />, color: '#1564f4' };
                case 'question':
                    return { icon: <HelpOutlineIcon sx={{ fontSize: 40 }} />, color: '#ffbb01' };
            }
        };

        const { icon, color } = getIconContent();

        return (
            <Box
                sx={{
                    width: '100px',
                    height: '120px',
                    backgroundColor: color,
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
                    margin: '20px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {icon}
            </Box>
        );
    };

    return (
        <Box>
            <Stack spacing={4}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MailOutlineIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            flexGrow: 1
                        }}
                    >
                        Email Preview
                    </Typography>
                </Box>

                <Divider />

                {/* Subject Section */}
                <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <SubjectIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="subtitle2" color="primary" sx={{ flexGrow: 1 }}>
                            Subject
                        </Typography>
                        <Tooltip title="Copy subject">
                            <IconButton
                                size="small"
                                onClick={() => handleCopy(formattedSubject, 'subject')}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 1,
                            p: 2,
                            bgcolor: theme.palette.grey[50],
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            fontFamily: theme.typography.fontFamily
                        }}
                    >
                        {formattedSubject}
                    </Paper>
                </Box>

                {/* Email Preview */}
                <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <MailOutlineIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="subtitle2" color="primary" sx={{ flexGrow: 1 }}>
                            Email Body
                        </Typography>
                        <Tooltip title="Copy email body">
                            <IconButton
                                size="small"
                                onClick={() => handleCopy(content, 'body')}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 1,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: `inset 0 2px 4px ${theme.palette.grey[100]}`
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            title="Email Preview"
                            style={{
                                width: '100%',
                                height: '600px',
                                border: 'none'
                            }}
                        />
                    </Paper>
                </Box>

                {/* Copy Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => handleCopy(formattedSubject, 'subject')}
                    >
                        Copy Subject
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => handleCopy(content, 'body')}
                    >
                        Copy Email Body
                    </Button>
                </Stack>
            </Stack>

            <Snackbar
                open={showCopied}
                autoHideDuration={2000}
                onClose={() => setShowCopied(false)}
                message={`${copiedType === 'subject' ? 'Subject' : 'Email body'} copied to clipboard!`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};
