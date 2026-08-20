import React, { memo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

export interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = memo(({ children }) => (
  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
    {children.map((child, idx) => (
      <View key={idx} style={{ width: Dimensions.get('window').width - 32 }}>
        {child}
      </View>
    ))}
  </ScrollView>
));

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 8,
  },
});
