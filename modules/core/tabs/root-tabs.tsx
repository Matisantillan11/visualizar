import { theme } from '@/modules/core'
import { TabBarIcon } from '@/modules/shared/components/navigation/TabBarIcon'
import { Tabs } from 'expo-router'
import React from 'react'

export const RootTabs = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.primary.brand600,
				headerShown: false,
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
