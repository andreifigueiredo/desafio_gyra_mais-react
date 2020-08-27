import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const INDEX_ROUTE = '/';
export const CHAT_ROUTE = '/chat';

const IndexPage = React.lazy(() => import('../components/index/IndexPage'));
const ChatPage = React.lazy(() => import('../components/chat/ChatPage'));
const NotFound = React.lazy(() => import('../components/NotFound'));

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={INDEX_ROUTE} component={IndexPage} />
      <Route exact path={CHAT_ROUTE} component={ChatPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;