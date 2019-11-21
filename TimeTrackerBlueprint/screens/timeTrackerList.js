import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import {
  Modal,
  withStyles,
  Text,
  Input,
  Avatar,
  Button,
  Layout,
} from 'react-native-ui-kitten';
import {trackings} from '../data';
import NavigationType from '../../../config/navigation/propTypes';
import {secondsToHms} from '../utils/index';
import timer from 'react-native-timer';

let dm = Dimensions.get('screen');

class _TimeTrackerList extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Time Trackers'.toUpperCase(),
  };

  state = {
    data: {
      original: trackings,
      filtered: trackings,
    },
    showPopup: false,
    interval: 0,
    timerStarted: false,
  };

  timerStart = () => {
    if (!this.state.timerStarted) {
      this.setState({timerStarted: true}, this.reloadPopup);
      // timer.setInterval(
      //   this,
      //   'timer',
      //   () => {
      //     this.setState({interval: this.state.interval + 1});
      //   },
      //   1000,
      // );
    } else {
      this.setState({timerStarted: false}, this.reloadPopup);
      //timer.clearInterval(this);
    }
  };

  timerEnd = () => {
    //timer.clearInterval(this);
    this.setState({
      timerStarted: false,
      showPopup: false,
    });
  };

  renderTimeTracker = () => {
    return (
      <View style={this.props.themedStyle.modalContainer}>
        <Avatar
          source={require('../assets/001.png')}
          size="giant"
          style={{width: 100, height: 100, marginVertical: 10}}
          style={{width: 100, height: 100, marginVertical: 10}}
        />
        <View style={{marginVertical: 20}}>
          <Text category="h1">{secondsToHms(this.state.interval)}</Text>
        </View>
        <View style={this.props.themedStyle.buttonWrapper}>
          <Button
            style={this.props.themedStyle.button}
            onPress={this.timerEnd}
            status="danger">
            STOP
          </Button>

          <Button
            style={this.props.themedStyle.button}
            onPress={this.timerStart}
            status="danger">
            {this.state.timerStarted ? 'PAUSE' : 'START'}
          </Button>
        </View>
      </View>
    );
  };

  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  openPopup = () => {
    this.setState({
      showPopup: true,
    });
  };

  reloadPopup = () => {
    this.closePopup()
    this.openPopup()
  };

  extractItemKey = item => `${item.id}`;

  onSearchInputChanged = event => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const items = _.filter(this.state.data.original, item => {
      const filterResult = {
        job: item.job.search(pattern),
        project: item.project.search(pattern),
      };
      return filterResult.job !== -1 || filterResult.project !== -1
        ? item
        : undefined;
    });

    this.setState({
      data: {
        original: this.state.data.original,
        filtered: items,
      },
    });
  };

  onItemPressed = item => {
    this.props.navigation.navigate('TimeTracker')
  };


  renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={this.props.themedStyle.container}>
          <Avatar
            source={require('../assets/001.png')}
            size="giant"
            style={this.props.themedStyle.avatar}
          />

          <View style={this.props.themedStyle.content}>
            <View style={this.props.themedStyle.mainContent}>
              <View style={this.props.themedStyle.text}>
                <Text>
                  <Text category="s1" style={this.props.themedStyle.text}>
                    {item.job}
                  </Text>
                  {/* <Text category="p2" style={this.props.themedStyle.text}>
                    {' '}
                    {item.project}
                  </Text> */}
                </Text>
              </View>
              <Text category="s1" style={this.props.themedStyle.textTime}>
                {secondsToHms(item.tracked)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={this.props.themedStyle.separator} />;

  renderHeader = () => (
    <View style={this.props.themedStyle.searchContainer}>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChange={this.onSearchInputChanged}
        status="info"
        placeholder="Search"
        style={this.props.themedStyle.Input}
        textStyle={this.props.themedStyle.text}
      />
    </View>
  );

  render = () => (
    <Layout>
      

      <FlatList
        style={this.props.themedStyle.root}
        data={this.state.data.filtered}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.extractItemKey}
        enableEmptySections
      />

      <Modal
        visible={this.state.showPopup}
        allowBackdrop={true}
        backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
        onBackdropPress={this.closePopup}>
        {this.renderTimeTracker()}
      </Modal>
    </Layout>
  );
}

export default TimeTrackerList = withStyles(_TimeTrackerList, theme => ({
  root: {
    backgroundColor: theme['color-basic-100'],
    // marginTop: 20
  },
  searchContainer: {
    backgroundColor: theme['color-basic-400'],
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme['color-basic-400'],
  },
  text: {
    color: theme['color-basic-1000'],
  },
  Input: {
    borderColor: theme['color-basic-400'],
    borderRadius: 25,
    backgroundColor: theme['color-basic-100'],
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 5,
  },
  textTime: {
    color: theme['color-basic-600'],
    marginTop: 5,
  },

  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#333c66',
    borderRadius: 8,
    padding: 10,
    width: dm.width * 0.8,
    margin: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    
  },
  button: {
    marginHorizontal: 10, 
    width: 120
  }
}));
