import Profile from "@/app/(app)/components/profile/profile.component";
import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { Role } from '@/app/(auth)/interfaces';
import BottomSheet from '@/components/bottom-sheet/bottom-sheet.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import NavbarLink from '../link/navbar-link.component';

export default function Menu({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}) {
  const { handleSignOut, user } = useAuthContext();

  const isTeacher = user?.role === Role.TEACHER;
  const router = useRouter();

  const navigateToRequestBook = () => {
    router.navigate('/book/request-book');
    bottomSheetModalRef.current?.close();
  };

  return (
    <BottomSheet bottomSheetRef={bottomSheetModalRef} snapPoints={['35%']}>
      <Profile />

      {isTeacher && (
        <NavbarLink
          source="book-outline"
          linkText="Solicitar libro"
          onPress={navigateToRequestBook}
        />
      )}

      <NavbarLink source="message-text-outline" linkText="FAQs" />
      <NavbarLink source="thumb-up-outline" linkText="Dar feedback" />
      <NavbarLink source="exit-to-app" linkText="Cerrar Sesión" onPress={() => handleSignOut()} />
    </BottomSheet>
  );
}
