import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from '@/constants';
import { Image } from 'expo-image';
import { View } from 'react-native';

export default function Profile() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
      }}>
      {user?.avatar ? (
        <Image
          source={{
            uri: user?.avatar as string,
          }}
          alt={`${user?.name}-picture`}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
      ) : (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primary.brand800,
          }}>
          <ThemedText>{user?.name?.slice(0, 1)?.toUpperCase()}</ThemedText>
        </View>
      )}

      <View style={{ paddingHorizontal: 20 }}>
        <ThemedText
          variant={ThemedTextVariants.default}
          style={{ fontWeight: 'bold', fontSize: 14 }}>
          {user?.name} - 2A
        </ThemedText>

        <ThemedText variant={ThemedTextVariants.default} style={{ fontSize: 12 }}>
          Instituto Carlos Pellegrini
        </ThemedText>
      </View>
    </View>
  );
}
