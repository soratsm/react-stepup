import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { homeRoutes } from "./HomeRoutes";
import { Login, Page404 } from "../components/pages";
import { HeaderLayout } from "../components/templates";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout> {route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        ></Route>
      </LoginUserProvider>
        <Route path="*">
          <Page404 />
        </Route>
    </Switch>
  );
});
