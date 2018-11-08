import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CitySearch from "./CitySearch";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/icons/Send";

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    margin: theme.spacing.unit,
    width: 'min-content'
  }
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              MeteoLeo
            </Typography>
            <CitySearch />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.props.submitCity()}
          >
            <Icon />
          </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);