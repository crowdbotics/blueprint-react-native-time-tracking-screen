import { createStackNavigator } from "react-navigation-stack";

import TimeTrackerList from "./screens/timeTrackerList";
import TimeTracker from "./screens/timeTracker";


import Home from "./screens";

export default TimeTrackerBlueprintNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    TimeTrackerList: { screen: TimeTrackerList },
    TimeTracker: { screen: TimeTracker },


  },
  {
    initialRouteName: "Home"
  }
);
