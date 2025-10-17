'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../../hooks/useAuth';
import "./globals.css";

// Create theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8',
      light: '#49A3F1',
    },
    background: {
      default: '#F8F9FA',
    },
    text: {
      primary: '#344767',
      secondary: '#7B809A',
    },
  },
});

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
