import React from "react";
import { AppRegistry } from "react-native";

import MovieDataList from "./App/Views/MovieDataList";

export default class App extends React.PureComponent {
    render(){
      return(
        <MovieDataList />
      );
    }
}

AppRegistry.registerComponent("App", () => App);
