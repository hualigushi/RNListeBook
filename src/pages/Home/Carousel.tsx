import {RootState} from '@/models/index';
import {ICarousel} from '@/models/home';
import {hp, viewportWidth, wp} from '@/utils/index';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import {connect, ConnectedProps} from 'react-redux';

const slideWidth = viewportWidth;
const sidewidth = wp(90);
export const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

const mapStateToProps = ({home}: RootState) => ({
  data: home.carousels,
  activeCarouselIndex: home.activeCarouselIndex,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface Iprops extends ModelState {}

const Carousel: React.FC<Iprops> = ({data, dispatch, activeCarouselIndex}) => {
  const onSnapToItem = (index: number) => {
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
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
          dotsLength={data.length || 0}
          activeDotIndex={activeCarouselIndex}
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
export default connector(Carousel);
