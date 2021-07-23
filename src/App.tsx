import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "contexts/AuthContext";

import { Home, Room, CreateRoom, AdminRoom } from "pages";

import "styles/global.scss";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/create" component={CreateRoom} />
          <Route path="/rooms/:roomId" component={Room} />

          <Route path="/admin/rooms/:roomId" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
