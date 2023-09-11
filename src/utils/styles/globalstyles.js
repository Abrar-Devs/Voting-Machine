import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#007acc',
    marginBottom: 5,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: 'rgba(0, 122, 204, 0.1)',
    width: '80%',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#007acc',
    borderWidth: 1,
  },
  btn: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    width: '80%',
    textAlign: 'center',
  },
});

export default globalStyles;
