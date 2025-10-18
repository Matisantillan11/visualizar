import Profile from '@/app/(app)/components/profile/profile.component';
import { useAuthContext } from '@/app/(auth)/hooks/useAuthContext';
import { Role } from '@/app/(auth)/interfaces';
import BottomSheet from '@/components/bottom-sheet/bottom-sheet.component';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import NavbarLink from '../link/navbar-link.component';

export default function Menu({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const { handleSignOut, user } = useAuthContext();

  const isTeacher = user?.role === Role.TEACHER;
  const router = useRouter();

  const navigateToRequestBook = () => {
    router.navigate('/book/request-book');
    onClose();
  };

  const handleLogOut = () => {
    handleSignOut();
    onClose();
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      {({ styles }: any) => {
        return (
          <View style={{ ...styles, paddingVertical: 20 }}>
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
            <NavbarLink source="exit-to-app" linkText="Cerrar Sesión" onPress={handleLogOut} />
          </View>
        );
      }}
      {/*  */}
    </BottomSheet>
  );
}
