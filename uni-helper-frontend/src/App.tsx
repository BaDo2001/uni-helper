import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import client from './ApolloClient';
import ContentPage from './components/layout/ContentPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import DashboardPage from './components/pages/Dashboard/DashboardPage';
import LoginPage from './components/pages/LoginPage';
import SubjectDetails from './components/pages/SubjectDetails/SubjectDetails';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './contexts/AuthContext';
import MessageProvider from './contexts/MessageContext';

const App = () => (
    <Router>
        <ApolloProvider client={client}>
            <MessageProvider>
                <AuthProvider>
                    <ContentPage>
                        <Switch>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <PrivateRoute path="/admin" adminOnly>
                                <AdminDashboardPage />
                            </PrivateRoute>
                            <PrivateRoute path="/dashboard">
                                <DashboardPage />
                            </PrivateRoute>
                            <PrivateRoute
                                path="/subjects/:id?"
                                adminOnly
                                render={({ match }) => <SubjectDetails subjectId={match.params.id} />}
                            />
                            <Route path="/">
                                <Redirect to="/dashboard" />
                            </Route>
                        </Switch>
                    </ContentPage>
                </AuthProvider>
            </MessageProvider>
        </ApolloProvider>
    </Router>
);

export default App;
