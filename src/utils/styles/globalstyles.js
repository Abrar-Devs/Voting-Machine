import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  flexGap: g => ({
    gap: g,
  }),
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'skyblue',
  },
  txtColor: (clr = '#007acc') => ({
    color: clr,
  }),
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
  disabledBtn: {
    backgroundColor: 'lightgray',
  },
  error: {
    color: 'red',
    width: '80%',
    textAlign: 'center',
  },
  spacings: ({
    mrgnVrtcl = 'auto',
    pdngVrtcl = 'auto',
    mrgnHztl = 'auto',
    pdngHztl = 'auto',
    mrgnTop = 'auto',
  }) => ({
    marginVertical: mrgnVrtcl,
    marginHorizontal: mrgnHztl,
    paddingVertical: pdngVrtcl,
    paddingHorizontal: pdngHztl,
    marginTop: mrgnTop,
  }),
  dimensions: ({width, height = 'auto'}) => ({
    width: width,
    height: height,
  }),
  cardView: {
    padding: 30,
    gap: 5,
    borderRadius: 10,
    borderColor: '#007acc',
    borderWidth: 1,
    width: '80%',
  },
});

export default globalStyles;
