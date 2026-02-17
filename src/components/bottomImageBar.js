import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const images = [
  require('../assets/slide_1.png'),
  require('../assets/4.png'),
  require('../assets/3.png'),
  require('../assets/4.png'),
];

const BottomImageBar = ({banner}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banner.length) {
        nextIndex = 0;
      }
      scrollViewRef.current.scrollTo({x: nextIndex * width, animated: true});
      setCurrentIndex(nextIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.floor(x / width));
    scrollX.setValue(x);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {banner?.map((image, index) => (
          <View style={{width: width, alignItems: 'center',padding:1}}>
            <Image
              key={index}
              source={{uri: image.bannerImage}}
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>   
      <View style={styles.dotContainer}>
        {banner?.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.1, 1, 0.1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, {backgroundColor: '#1DD8E0', opacity}]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: 220,
    borderRadius: 15,
    resizeMode: 'stretch',
  },
  // image: {
  //   width: width,
  //   height: 220,
  //   borderRadius: 15,
  //   resizeMode: 'contain', // Ensures image fits without cropping or stretching
  // },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // Margin between image and dots
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default BottomImageBar;
