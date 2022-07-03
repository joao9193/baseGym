import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './views/SignUp';

export default function App() {
	const [ isLoggedIn, onChangeLoggedIn ] = React.useState(false);
	const [, onChangeCurrentUser ] = React.useState({});

	if (isLoggedIn) {
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		);
	} else { 
		return (
			<SignUp
				onChangeLoggedIn={onChangeLoggedIn}
				onChangeCurrentUser={onChangeCurrentUser}
			/>
		);
	}
}
    
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
    