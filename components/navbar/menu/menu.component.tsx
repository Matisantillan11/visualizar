import Profile from "@/app/(app)/components/profile/profile.component";
import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import BottomSheet from "@/components/bottom-sheet/bottom-sheet.component";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import NavbarLink from "../link/navbar-link.component";

export default function Menu({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}) {
  const { handleSignOut } = useAuthContext();

  return (
    <BottomSheet bottomSheetRef={bottomSheetModalRef} snapPoints={["35%"]}>
      <Profile />

      <NavbarLink source="message-text-outline" linkText="FAQs" />
      <NavbarLink source="thumb-up-outline" linkText="Dar feedback" />
      <NavbarLink
        source="exit-to-app"
        linkText="Cerrar Sesión"
        onPress={() => handleSignOut()}
      />
    </BottomSheet>
  );
}
