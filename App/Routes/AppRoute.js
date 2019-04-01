import React from "react";
import { Root } from "native-base";
import {createDrawerNavigatior, createStackNavigator, createAppContainer} from "react-navigation";

const DrawerNavigator = createDrawerNavigatior({

})

const StackNavigator = createStackNavigator({

})

const AppContainer = createAppContainer(StackNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
