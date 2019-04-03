import React from "react";
import { Root } from "native-base";
import {createDrawerNavigatior, createStackNavigator, createAppContainer} from "react-navigation";

import MovieDataList from "../Views/MovieDataList";
import MovieDetail from "../Views/MovieDetail";

const StackNavigator = createStackNavigator({

  MovieListData: { screen: MovieDataList}, // homePage
  MovieListData_Detail: { screen: MovieDetail}
},{
  initialRouteName : "MovieListData",
  headerMode : "none"

})

const AppContainer = createAppContainer(StackNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
