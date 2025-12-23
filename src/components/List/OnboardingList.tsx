import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { OnboardingListComponent } from '../ListItems/OnboardingListComponent';
import { onboardingData } from '../../screens/common/Onboarding/onboardingData';

type OnboardingListProp = {
  flatListRef: RefObject<FlatList | null>;
  handleScroll: (event: any) => void;
};

export const OnboardingList = ({
  flatListRef,
  handleScroll,
}: OnboardingListProp) => {
  const renderItem = ({ item }: any) => {
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
