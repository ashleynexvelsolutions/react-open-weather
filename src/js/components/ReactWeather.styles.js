import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    maxWidth: '196px',
    fontFamily: ({ theme }) => theme.fontFamily,
    fontSize: 10,
    boxShadow: ({ theme }) => theme.containerDropShadow,
    borderRadius: '0 0 5px 5px',
  },
  main: {
    color: ({ theme }) => theme.locationFontColor,
    width: '100%',
    height: '100%',
    background: ({ theme }) =>
      `linear-gradient(to bottom right, ${theme.gradientStart}, ${theme.gradientMid}, ${theme.gradientEnd})`,
    display: 'flex',
    borderRadius: ({ showForecast }) => (showForecast ? [[5, 5, 0, 0]] : 5),
  },
  header: {
    margin: [0, 0, 10, 0],
    fontWeight: '300',
    fontSize: 'x-large',
    letterSpacing: 2,
  },
  left: {
    padding: 25,
    width: '60%',
  },
  right: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default useStyles;
