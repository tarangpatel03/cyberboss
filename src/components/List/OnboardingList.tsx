import { RefObject } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { OnboardingListComponent } from '../ListItems/OnboardingListComponent';
import {
  onboardingData,
  OnboardingDataProps,
} from '../../screens/common/Onboarding/onboardingData';

type OnboardingListProp = {
  flatListRef: RefObject<FlatList | null>;
  handleScroll: (event: any) => void;
};

export const OnboardingList = ({
  flatListRef,
  handleScroll,
}: OnboardingListProp) => {
  const renderItem: ListRenderItem<OnboardingDataProps> = ({ item }) => {
    return <OnboardingListComponent data={item} />;
  };

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
