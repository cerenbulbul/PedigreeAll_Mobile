import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import Indicator from './Indicator';
import ChildItem from './ChildItem';
import {Card} from 'react-native-elements';

export default class FlatListSlider extends Component {
  slider = createRef();

  static defaultProps = {
    data: [],
    imageKey: 'image',
    textKey: 'text',
    title:'title',
    local: false,
    width: Math.round(Dimensions.get('window').width),
    height: 230,
    separatorWidth: 0,
    loop: true,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    animation: true,
    autoscroll: true,
    onPress: {},
    contentContainerStyle: {},
    component: <ChildItem/>,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: this.props.data,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


  componentDidUpdate(prevprops) {
    if (prevprops.data !== this.props.data) this.setState({ data: this.props.data });
  }
  


  render() {
    const itemWidth = this.props.width;
    const separatorWidth = this.props.separatorWidth;
    const totalItemWidth = itemWidth + separatorWidth;

    return (
      <View>
        <FlatList
          ref={this.slider}
          horizontal
          pagingEnabled={true}
          contentContainerStyle={this.props.contentContainerStyle}
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          renderItem={ ({ item, index }) => (
            <TouchableOpacity onPress={() => this.props.onPress(index)}>
              <Card containerStyle= {{borderRadius:8, shadowColor:'#000',elevation: 10, width:380}}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Image 
              style={{resizeMode:'contain'}}
              source={{uri: item.src }} />
              <View style={{height:20}}></View>
              <Text>{item.text}</Text>
             </Card>
            </TouchableOpacity>

          )}
          ItemSeparatorComponent={() => (
            <View style={{width: this.props.separatorWidth}} />
          )}
          keyExtractor={(item, index) => item.toString() + index}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={(data, index) => ({
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
          })}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
        />
        {this.props.indicator && (
          <Indicator
            itemCount={this.props.data.length}
            currentIndex={this.state.index % this.props.data.length}
            indicatorStyle={this.props.indicatorStyle}
            indicatorContainerStyle={[
              styles.indicatorContainerStyle,
              this.props.indicatorContainerStyle,
            ]}
            indicatorActiveColor={this.props.indicatorActiveColor}
            indicatorInActiveColor={this.props.indicatorInActiveColor}
            indicatorActiveWidth={this.props.indicatorActiveWidth}
            style={{...styles.indicator, ...this.props.indicatorStyle}}
          />
        )}
      </View>
    );
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index;
      this.setState({index: currentIndex});

      if (this.props.currentIndexCallback) {
        this.props.currentIndexCallback(currentIndex);
      }
    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  changeSliderListIndex = () => {
    if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
    }
    this.setState({index: this.state.index + 1});
    this.slider.current.scrollToIndex({
      index: this.state.index,
      animated: true,
    });
  };



}

const styles = StyleSheet.create({
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
