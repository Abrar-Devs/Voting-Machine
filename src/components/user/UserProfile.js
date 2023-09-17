import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Card, Divider} from 'react-native-elements';
import {useSelector} from 'react-redux';
import globalStyles from '../../utils/styles/globalstyles';

const UserProfile = () => {
  const user = useSelector(state => state.user);
  console.log('in usrProfile', user);
  return (
    <View style={globalStyles.container}>
      <View>
        <Avatar
          rounded
          size="xlarge"
          source={{uri: user.profilePic}}
          containerStyle={styles.avatarContainer}
        />
        {/* <Image
          style={styles.img}
          source={{
            uri: user.profilePic,
          }}
        /> */}
        <Text style={styles.username}>{user.name}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.userInfo}>Email: {user.email}</Text>
        <Text style={styles.userInfo}>Constitution: {user.constitution}</Text>
        <Text style={styles.userInfo}>CNIC: {user.cnic}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // padding: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
  username: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  profilePic: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    borderRadius: 100, // For a circular profile picture
  },
});

export default UserProfile;
