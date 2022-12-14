import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from '../navigation/RootNavigator';
import {WithThemeProvider} from './ThemeWraper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <WithThemeProvider>
          <RootNavigator />
        </WithThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
