import { useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { TemplateSelector } from './components/TemplateSelector';
import { TemplateForm } from './components/TemplateForm';
import { emailTemplates } from './data/emailTemplates';
import { EmailTemplate } from './types/email';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#012160', // ParkourSC blue
      light: '#1564f4',
    },
    secondary: {
      main: '#ffbb01', // ParkourSC yellow
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#012160',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pb: 4
      }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ParkourSC Email Template Generator
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <TemplateSelector
            templates={emailTemplates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />

          {selectedTemplate && (
            <TemplateForm
              template={selectedTemplate}
              onUpdateContent={() => { }}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
