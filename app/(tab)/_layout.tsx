import { Tabs, useRouter } from 'react-native-auto-route';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Layout() {
  
  return (
    <Tabs
      initialRouteName="(drawer)" // initialRouteName is directory name or filename
      screenOptions={({ route }) => ({
        // https://reactnavigation.org/docs/native-stack-navigator#props
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          
          if (route.name === '(drawer)') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else {
            if (route.name === 'profile/index') {
              iconName = focused ? 'person' : 'person-outline';
            }
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
      <Tabs.Screen
        name="(drawer)" // name prop is directory name or filename
        options={{
          tabBarBadge: 3 
        }} 
      />
      <Tabs.Screen
        name="profile/index" // name prop is directory name or filename
        options={{
          
        }} 
      />
    </Tabs>
  );
}