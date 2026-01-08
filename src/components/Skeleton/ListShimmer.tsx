import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FlatList, View } from 'react-native';
import {Utils} from '@utils/index';
import { useCallback } from 'react';
import { Components } from '@components/index';

type ListShimmerProps = {
  containerStyle: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
};

export const ListShimmer = ({
  containerStyle,
  scrollEnabled,
}: ListShimmerProps) => {
  const renderItem = useCallback(() => {
    return <Components.Skeleton.ShimmerHolder style={containerStyle} />;
  }, [containerStyle]);

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
    gap: Utils.normalize(12),
  },
  list: {
    paddingHorizontal: Utils.normalize(12),
  },
});
