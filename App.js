import React from "react";
import { AppRegistry } from "react-native";

// import MovieDataList from "./App/Views/MovieDataList";
import AppRoute from "./App/Routes/AppRoute";

export default class App extends React.PureComponent {
    render(){
      return(
        // <MovieDataList />
        <AppRoute />
      );
    }
}

AppRegistry.registerComponent("App", () => App);
