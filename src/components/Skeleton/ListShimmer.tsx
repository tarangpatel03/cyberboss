import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FlatList, View } from 'react-native';
import { ShimmerHolder } from './ShimmerHolder';
import normalize from '../../utils/normalize/normalize';

type listShimmerProps = {
  containerStyle: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
};

export const ListShimmer = ({
  containerStyle,
  scrollEnabled,
}: listShimmerProps) => {
  const renderItem = () => {
    return <ShimmerHolder style={containerStyle} />;
  };

  return (
    <View style={staticStyle.list}>
      <FlatList
        scrollEnabled={scrollEnabled ?? true}
        keyExtractor={item => item.toString()}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        initialNumToRender={9}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={null}
        renderItem={renderItem}
      />
    </View>
  );
};

export const staticStyle = StyleSheet.create({
  listItems: {
    flexGrow: 1,
    gap: normalize(12),
  },
  list: {
    paddingHorizontal: normalize(12),
  },
});
