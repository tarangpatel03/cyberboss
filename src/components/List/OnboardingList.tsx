import { RefObject, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { OnboardingListComponent } from '@components/ListItems/OnboardingListItem';
import {
  onboardingData,
  onboardingDataProps,
} from '@screens/common/Onboarding/onboardingData';

type OnboardingListProp = {
  flatListRef: RefObject<FlatList | null>;
  handleScroll: (event: any) => void;
};

export const OnboardingList = ({
  flatListRef,
  handleScroll,
}: OnboardingListProp) => {
  const renderItem: ListRenderItem<onboardingDataProps> = useCallback(
    ({ item }) => {
      return <OnboardingListComponent data={item} />;
    },
    [],
  );

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      pagingEnabled
      data={onboardingData}
      initialNumToRender={2}
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={null}
    />
  );
};
