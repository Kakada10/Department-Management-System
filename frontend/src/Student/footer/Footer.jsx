import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Facebook, Twitter, Instagram } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    position: 'static',
    // bottom: 0,
  },
});

export default function Footer() {
    const classes = useStyles();
  return (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction label="Facebook" icon={<Facebook />} />
      <BottomNavigationAction label="Twitter" icon={<Twitter />} />
      <BottomNavigationAction label="Instagram" icon={<Instagram />} />
    </BottomNavigation>
  );

}
