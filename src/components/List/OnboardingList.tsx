import { RefObject } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { OnboardingListComponent } from '../ListItems/OnboardingListComponent';
import {
  onboardingData,
  onboardingDataProps,
} from '../../screens/common/Onboarding/onboardingData';

type onboardingListProp = {
  flatListRef: RefObject<FlatList | null>;
  handleScroll: (event: any) => void;
};

export const OnboardingList = ({
  flatListRef,
  handleScroll,
}: onboardingListProp) => {
  const renderItem: ListRenderItem<onboardingDataProps> = ({ item }) => {
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
