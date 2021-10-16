import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import client from './ApolloClient';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import CalendarPage from './components/pages/CalendarPage';
import DashboardPage from './components/pages/DashboardPage';
import LoginPage from './components/pages/LoginPage';
import PrivateRoute from './components/utils/PrivateRoute';
import AuthProvider from './contexts/AuthContext';

const App = () => (
    <Router>
        <AuthProvider>
            <ApolloProvider client={client}>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <PrivateRoute path="/admin">
                        <AdminDashboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard">
                        <DashboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/calendar">
                        <CalendarPage />
                    </PrivateRoute>
                    <PrivateRoute path="/">
                        <Redirect to="/login" />
                    </PrivateRoute>
                </Switch>
            </ApolloProvider>
        </AuthProvider>
    </Router>
);

export default App;
