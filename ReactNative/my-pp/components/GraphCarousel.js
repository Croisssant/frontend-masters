import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { WindGraph } from './WindGraph';

export const GraphCarousel = () => {
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);
    const SLIDER_WIDTH = Dimensions.get("window").width
    
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

    const CarouselCardItem = ({item, index}) => {
        if (index === 0) {
            return (<WindGraph />)
        } else if (index === 1) {
            return (<WindGraph />)
        }
    }

    return (
        <View>
            <Carousel 
                layout='default'
                ref={isCarousel}
                data={[0, 1]}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Text>1</Text>
            <Pagination 
                dotsLength={2}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        </View>
    )
}