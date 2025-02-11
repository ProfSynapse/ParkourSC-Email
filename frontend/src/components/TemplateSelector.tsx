import { Box, Card, CardContent, Typography, Grid, Chip, useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { EmailTemplate } from '../types/email';

interface TemplateSelectorProps {
    templates: EmailTemplate[];
    selectedTemplate: EmailTemplate | null;
    onSelectTemplate: (template: EmailTemplate) => void;
}

export const TemplateSelector = ({
    templates,
    selectedTemplate,
    onSelectTemplate
}: TemplateSelectorProps) => {
    const theme = useTheme();

    const getTemplateIcon = (id: string) => {
        switch (id) {
            case 'uat-deployment-notice':
                return <NotificationsIcon sx={{ fontSize: 40, color: theme.palette.primary.light }} />;
            case 'uat-deployment-complete':
                return <CheckCircleIcon sx={{ fontSize: 40, color: theme.palette.primary.light }} />;
            case 'prod-deployment-start':
                return <PlayArrowIcon sx={{ fontSize: 40, color: theme.palette.primary.light }} />;
            case 'prod-deployment-complete':
                return <DoneAllIcon sx={{ fontSize: 40, color: theme.palette.primary.light }} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: 'bold'
            }}>
                Select Email Template
            </Typography>
            <Grid container spacing={3}>
                {templates.map((template) => (
                    <Grid item xs={12} sm={6} md={3} key={template.id}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: selectedTemplate?.id === template.id
                                    ? 'primary.light'
                                    : 'background.paper',
                                color: selectedTemplate?.id === template.id
                                    ? 'white'
                                    : 'text.primary',
                                '&:hover': {
                                    bgcolor: selectedTemplate?.id === template.id
                                        ? 'primary.light'
                                        : 'action.hover',
                                    transform: 'translateY(-4px)',
                                    transition: 'transform 0.2s ease-in-out'
                                }
                            }}
                            onClick={() => onSelectTemplate(template)}
                        >
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 2
                            }}>
                                {getTemplateIcon(template.id)}
                                <Typography variant="h6" gutterBottom sx={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: selectedTemplate?.id === template.id
                                        ? 'white'
                                        : 'primary.main'
                                }}>
                                    {template.name}
                                </Typography>
                                <Chip
                                    label={template.category}
                                    size="small"
                                    sx={{
                                        bgcolor: selectedTemplate?.id === template.id
                                            ? 'rgba(255,255,255,0.2)'
                                            : 'primary.light',
                                        color: selectedTemplate?.id === template.id
                                            ? 'white'
                                            : 'white',
                                        textTransform: 'capitalize'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
