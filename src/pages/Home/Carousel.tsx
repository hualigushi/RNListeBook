import {ICarousel} from '@/models/home';
import {hp, viewportWidth, wp} from '@/utils/index';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';

const slideWidth = viewportWidth;
const sidewidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

interface Iprops {
  data: ICarousel[];
}
const Carousel: React.FC<Iprops> = ({data}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const onSnapToItem = (index: number) => {
    setActiveSlide(index);
  };

  const renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        parallaxFactor={0.8}
        containerStyle={styles.imageContainer}
        showSpinner
        spinnerColor="rgba(0,0,0,,0.25)"
        {...parallaxProps}
      />
    );
  };

  return (
    <View>
      <SnapCarousel
        data={data}
        renderItem={renderItem}
        sliderWidth={slideWidth}
        itemWidth={itemWidth}
        loop
        autoplay
        onSnapToItem={onSnapToItem}
        hasParallaxImages
      />
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});
export default Carousel;
