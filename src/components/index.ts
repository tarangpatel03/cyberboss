import { BarTabIcon } from './BarTabIcon.tsx';
import { BillDetailsComponent } from './BillDetail.tsx';
import { CircularIconButton } from './Buttons/CircularIconButton';
import { PrimaryButton } from './Buttons/PrimaryButton';
import { SettingOptionsButton } from './Buttons/SettingsButton';
import { BookingCard } from './Cards/BookingCard';
import { BookingHistoryCard } from './Cards/BookingHistoryCard';
import { BookingPaymentDetailsCard } from './Cards/BookingPaymentDetailsCard';
import { CategoryCard } from './Cards/CategoryCard';
import { ChatListEmptyCard } from './Cards/ChatListEmptyCard';
import { ChatListItem } from './Cards/ChatListItem';
import { ConsultantListCard } from './Cards/ConsultantListCard';
import { ListEmptyCard } from './Cards/ListEmptyCard';
import { MessageCard } from './Cards/MessageCard';
import { NotificationCard } from './Cards/NotificationCard';
import { OneToOneChatCard } from './Cards/OneToOneChatCard';
import { RecentActivity } from './Cards/RecentActivity';
import { RoleSelectionCard } from './Cards/RoleSelectionCard';
import { ServiceCard } from './Cards/ServiceCard';
import { ThemeSelectionCard } from './Cards/ThemeSelectionCard';
import { WorkshopCard } from './Cards/WorkshopCard';
import { WorkshopFlatListCard } from './Cards/WorkShopFlatlistCard';
import { ConsultantInfoBadge } from './ConsultantInfoBadge';
import { BottomTabHeader } from './Headers/BottomTabHeader';
import { ScreenHeader } from './Headers/ScreenHeader';
import { IndicationBar } from './IndicationBar';
import { CustomInput } from './Input/CustomInput.tsx';
import { BioInputComponent } from './Input/MultiLineInput';
import { SearchBorderInputComponent } from './Input/SearchInput';
import { ConsultantRatingsList } from './ListItems/ConsultantRatingListItem';
import { OnboardingListComponent } from './ListItems/OnboardingListItem';
import { LogOutModal } from './Modal/LogOutModal';
import { ThemeModal } from './Modal/ThemeModal';
import { PickProfilePictureContainer } from './PickProfilePictureContainer';
import { ClientHomeScreenShimmer } from './Skeleton/clientHome';
import { ConsultantProfileScreenShimmer } from './Skeleton/consultantProfile';
import { ListShimmer } from './Skeleton/ListShimmer';
import { ShimmerHolder } from './Skeleton/ShimmerHolder';
import { TextComponent } from './TextComponent.tsx';

export const Components = {
  BarTabIcon,
  Buttons: {
    CircularIconButton,
    PrimaryButton,
    SettingOptionsButton,
  },
  Cards: {
    BookingCard,
    BookingHistoryCard,
    BookingPaymentDetailsCard,
    CategoryCard,
    ChatListEmptyCard,
    ChatListItem,
    ConsultantListCard,
    ListEmptyCard,
    MessageCard,
    NotificationCard,
    OneToOneChatCard,
    RecentActivity,
    RoleSelectionCard,
    ServiceCard,
    ThemeSelectionCard,
    WorkshopCard,
    WorkshopFlatListCard,
  },
  Headers: {
    BottomTabHeader,
    ScreenHeader,
  },
  Inputs: {
    CustomInput,
    BioInputComponent,
    SearchBorderInputComponent,
  },
  ListItems: {
    ConsultantRatingsList,
    OnboardingListComponent,
  },
  Modals: {
    LogOutModal,
    ThemeModal,
  },
  Skeleton: {
    ClientHomeScreenShimmer,
    ConsultantProfileScreenShimmer,
    ListShimmer,
    ShimmerHolder,
  },
  BillDetailsComponent,
  TextComponent,
  ConsultantInfoBadge,
  IndicationBar,
  PickProfilePictureContainer,
};
