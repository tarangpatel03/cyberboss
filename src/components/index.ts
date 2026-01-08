import { AuthOptions } from "./Auth/AuthOptions";
import { AuthTitle } from "./Auth/AuthTitle";
import { SocialLogIn } from "./Auth/SocialLogin";
import { BillDetailsComponent } from "./BillDetail";
import { BarTabIcon } from "./BottomTabIcon/BarTabIcon";
import { CircularIconButton } from "./Buttons/CircularIconButton";
import { HomeScreenSearchButtons } from "./Buttons/HomeScreenSearchBar";
import { AuthFooterAction } from "./Buttons/HorizontalTextButton";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { PrimaryButtonWithIcon } from "./Buttons/PrimaryButtonWithIcon";
import { SettingOptionsButton } from "./Buttons/SettingsButton";
import { BookingCard } from "./Cards/BookingCard";
import { BookingHistoryCard } from "./Cards/BookingHistoryCard";
import { BookingPaymentDetailsCard } from "./Cards/BookingPaymentDetailsCard";
import { BookingStatusCard } from "./Cards/BookingStatusCard";
import { BookingSummaryDetailsCard } from "./Cards/BookingSummaryDetailsCard";
import { CategoryCard } from "./Cards/CategoryCard";
import { ChatListEmptyCard } from "./Cards/ChatListEmptyCard";
import { ChatListItem } from "./Cards/ChatListItem";
import { ConsultantExpertiseCard } from "./Cards/ConsultantExpertiseCard";
import { ConsultantListCard } from "./Cards/ConsultantListCard";
import { ConsultantServiceSummaryCard } from "./Cards/ConsultantServiceSummaryCard";
import { ListEmptyCard } from "./Cards/ListEmptyCard";
import { MessageCard } from "./Cards/MessageCard";
import { NotificationCard } from "./Cards/NotificationCard";
import { OneToOneChatCard } from "./Cards/OneToOneChatCard";
import { ProfileCard } from "./Cards/ProfileCard";
import { ProfileOptionsRow } from "./Cards/ProfileOptionsRow";
import { RatingCard } from "./Cards/RatingReviewCard";
import { RecentActivity } from "./Cards/RecentActivity";
import { ReviewCard } from "./Cards/ReviewCard";
import { RoleSelectionCard } from "./Cards/RoleSelectionCard";
import { ServiceCard } from "./Cards/ServiceCard";
import { ServiceListCard } from "./Cards/ServiceListCard";
import { StarReviewCard } from "./Cards/StarReviewCard";
import { SubscriptionBenefitsCard } from "./Cards/SubscriptionBenefitsCard";
import { ThemeSelectionCard } from "./Cards/ThemeSelectionCard";
import { WorkshopCard } from "./Cards/WorkshopCard";
import { WorkshopFlatListCard } from "./Cards/WorkShopFlatlistCard";
import { ConsultantInfoBadge } from "./ConsultantInfoBadge";
import { BottomTabHeader } from "./Headers/BottomTabHeader";
import { ConsultantHeaderCard } from "./Headers/ConsultantHeaderCard";
import { ConsultantProfileHeader } from "./Headers/ConsultantProfileHeader";
import { HomeScreenListHeader } from "./Headers/HomeScreenListHeader";
import { ScreenHeader } from "./Headers/ScreenHeader";
import { SubscriptionHeader } from "./Headers/SubscriptionHeader";
import { TopBarHeader } from "./Headers/TopBarComponent";
import { IndicationBar } from "./IndicationBar";
import { BorderInput } from "./Input/BorderInput";
import { EditProfileInputs } from "./Input/EditProfileInput";
import { CustomInput } from "./Input/EmailAndPasswordInput";
import { LogInInputsContainer } from "./Input/LogInInputContainer";
import { BioInputComponent } from "./Input/MultiLineInput";
import { PasswordInput } from "./Input/PasswordInput";
import { ReviewInput } from "./Input/ReviewInput";
import { SearchBorderInputComponent } from "./Input/SearchInput";
import { SignUpInputContainer } from "./Input/SignUpInputContainer";
import { ConsultantBookingHistoryList } from "./List/ConsultantBookingHistoryList";
import { HomeScreenWorkshopList } from "./List/HomeScreenWorkshopList";
import { OnboardingList } from "./List/OnboardingList";
import { UpcomingWorkShopsList } from "./List/UpcomingWorkShopsList";
import { ConsultantRatingsList } from "./ListItems/ConsultantRatingListItem";
import { OnboardingListComponent } from "./ListItems/OnboardingListItem";
import { SubscriptionBenefits } from "./ListItems/SubscriptionBenefts";
import { LogOutModal } from "./Modal/LogOutModal";
import { ThemeModal } from "./Modal/ThemeModal";
import { PickProfilePictureContainer } from "./PickProfilePictureContainer";
import { GeneralSettings } from "./Settings/GeneralSettings";
import { ClientHomeScreenShimmer } from "./Skeleton/clientHome";
import { ConsultantProfileScreenShimmer } from "./Skeleton/consultantProfile";
import { ListShimmer } from "./Skeleton/ListShimmer";
import { ShimmerHolder } from "./Skeleton/ShimmerHolder";
import { SubscriptionBottomBar } from "./Subscription/SubscriptionBottomBar";
import { SubscriptionTrustedUser } from "./Subscription/SubscriptionTrustedUser";
import { TextComponent } from "./Text/TextComponent";

export const Components = {
    Auth: {
        AuthOptions,
        AuthTitle,
        SocialLogIn,
    },
    BarTabIcon,
    Buttons: {
        CircularIconButton,
        HomeScreenSearchButtons,
        AuthFooterAction,
        PrimaryButton,
        PrimaryButtonWithIcon,
        SettingOptionsButton,
    },
    Cards: {
        BookingCard,
        BookingHistoryCard,
        BookingPaymentDetailsCard,
        BookingSummaryDetailsCard,
        BookingStatusCard,
        CategoryCard,
        ChatListEmptyCard,
        ChatListItem,
        ConsultantExpertiseCard,
        ConsultantListCard,
        ConsultantServiceSummaryCard,
        ListEmptyCard,
        MessageCard,
        NotificationCard,
        OneToOneChatCard,
        ProfileCard,
        ProfileOptionsRow,
        RatingCard,
        RecentActivity,
        ReviewCard,
        RoleSelectionCard,
        ServiceCard,
        ServiceListCard,
        StarReviewCard,
        SubscriptionBenefitsCard,
        ThemeSelectionCard,
        WorkshopCard,
        WorkshopFlatListCard,
    },
    Headers: {
        BottomTabHeader,
        ConsultantHeaderCard,
        ConsultantProfileHeader,
        HomeScreenListHeader,
        ScreenHeader,
        SubscriptionHeader,
        TopBarHeader,
    },
    Inputs: {
        BorderInput,
        EditProfileInputs,
        CustomInput,
        LogInInputsContainer,
        BioInputComponent,
        PasswordInput,
        ReviewInput,
        SearchBorderInputComponent,
        SignUpInputContainer,
    },
    List: {
        ConsultantBookingHistoryList,
        HomeScreenWorkshopList,
        OnboardingList,
        UpcomingWorkShopsList,
    },
    ListItems: {
        ConsultantRatingsList,
        OnboardingListComponent,
        SubscriptionBenefits,
    },
    Modals: {
        LogOutModal,
        ThemeModal,
    },
    GeneralSettings,
    Skeleton: {
        ClientHomeScreenShimmer,
        ConsultantProfileScreenShimmer,
        ListShimmer,
        ShimmerHolder,
    },
    Subscription: {
        SubscriptionBottomBar,
        SubscriptionTrustedUser,
    },
    TextComponent,
    BillDetailsComponent,
    ConsultantInfoBadge,
    IndicationBar,
    PickProfilePictureContainer,
}