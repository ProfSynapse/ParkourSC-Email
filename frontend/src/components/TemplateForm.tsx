import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Typography,
    Paper,
    Stack,
    useTheme,
    Divider,
    InputAdornment,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { EmailTemplate } from '../types/email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EmailPreview } from './EmailPreview';

// Simple toolbar with just basic text formatting
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false
    },
    keyboard: {
        bindings: {
            tab: false,
            enter: {
                key: 13,
                shiftKey: null,
                handler: (range: { index: number; length: number }, context: { quill: any }) => {
                    const quill = context.quill;
                    quill.insertText(range.index, '\n');
                    return false;
                }
            }
        }
    }
};

const formats = [
    'bold', 'italic', 'underline'
];

interface TemplateFormProps {
    template: EmailTemplate;
    onUpdateContent: (content: string) => void;
}

export const TemplateForm = ({ template, onUpdateContent }: TemplateFormProps) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [previewContent, setPreviewContent] = useState(template.template);
    const theme = useTheme();

    const handleInputChange = (key: string, value: string) => {
        const newFormData = { ...formData, [key]: value };
        setFormData(newFormData);

        let content = template.template;
        Object.entries(newFormData).forEach(([k, v]) => {
            if (v) {
                const placeholder = `{${k}}`;
                const field = template.fields.find(f => f.key === k);
                let processedValue = v;

                if (field?.type === 'richtext') {
                    // For rich text fields, handle content with preserved formatting
                    const lines = v
                        .replace(/<p><br><\/p>/g, '') // Remove empty paragraphs
                        .replace(/<p>/g, '') // Remove opening p tags
                        .replace(/<\/p>/g, '\n') // Convert closing p tags to newlines
                        .split('\n') // Split on newlines
                        .filter(line => line.trim() !== '');

                    if (lines.length > 0) {
                        const listItems = lines.map(line => {
                            // Clean the line but preserve bold/italic/underline formatting
                            const cleanLine = line
                                .replace(/<\/?ul[^>]*>/g, '')
                                .replace(/<\/?li[^>]*>/g, '')
                                .replace(/\s+/g, ' ') // Normalize whitespace
                                .trim();
                            return cleanLine ? `<li style="margin-bottom: 8px; line-height: 1.6;">${cleanLine}</li>` : '';
                        }).filter(item => item !== '').join('');

                        processedValue = listItems ?
                            `<ul style="margin: 0; padding-left: 20px; list-style-type: disc;">${listItems}</ul>` : '';
                    } else {
                        processedValue = '';
                    }
                } else {
                    // For regular text fields, preserve line breaks
                    processedValue = v.replace(/\n/g, '<br/>');
                }

                content = content.replace(new RegExp(placeholder, 'g'), processedValue);
            }
        });
        setPreviewContent(content);
        onUpdateContent(content);
    };

    useEffect(() => {
        setFormData({});
        setPreviewContent(template.template);
        onUpdateContent(template.template);
    }, [template.id, onUpdateContent]);

    const getFieldIcon = (type: string) => {
        switch (type) {
            case 'date':
                return <CalendarTodayIcon color="primary" />;
            case 'textarea':
                return <ListAltIcon color="primary" />;
            default:
                return <EditIcon color="primary" />;
        }
    };

    return (
        <Container maxWidth="lg">
            <Stack spacing={4}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        backgroundColor: 'background.paper'
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            mb: 3
                        }}
                    >
                        Fill in Template Details
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={4}>
                        {/* Regular text fields first */}
                        {template.fields.filter(field => field.type !== 'richtext').map((field) => (
                            <Box key={field.key}>
                                <TextField
                                    label={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.key] || ''}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {getFieldIcon(field.type)}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                />
                            </Box>
                        ))}

                        {/* Rich text fields after */}
                        {template.fields.filter(field => field.type === 'richtext').map((field) => (
                            <Box key={field.key}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.text.secondary }}>
                                    {field.name}
                                </Typography>
                                <Box sx={{
                                    '& .ql-toolbar': {
                                        borderColor: theme.palette.divider,
                                        borderTopLeftRadius: 1,
                                        borderTopRightRadius: 1,
                                        backgroundColor: theme.palette.grey[50],
                                        padding: '12px'
                                    },
                                    '& .ql-container': {
                                        borderColor: theme.palette.divider,
                                        borderBottomLeftRadius: 1,
                                        borderBottomRightRadius: 1,
                                        minHeight: '250px',
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    },
                                    '& .ql-editor': {
                                        minHeight: '250px',
                                        padding: '20px',
                                        lineHeight: 1.6,
                                        '&.ql-blank::before': {
                                            fontStyle: 'normal',
                                            color: theme.palette.text.secondary,
                                            fontFamily: theme.typography.fontFamily
                                        }
                                    },
                                    mb: 4,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    boxShadow: `inset 0 2px 4px ${theme.palette.grey[100]}`
                                }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData[field.key] || ''}
                                        onChange={(content) => handleInputChange(field.key, content)}
                                        modules={modules}
                                        formats={formats}
                                        placeholder={field.placeholder}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        backgroundColor: 'background.paper'
                    }}
                >
                    <EmailPreview content={previewContent} />
                </Paper>
            </Stack>
        </Container>
    );
};
