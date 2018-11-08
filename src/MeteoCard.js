import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 100,
    boxShadow: 'none'
  },
  title: {
    fontSize: 14,
  },
  media: {
    objectFit: 'contain',
  },
};

function SimpleCard(props) {
  const { classes } = props;
  var image = require("./img/sun.png");
  var alt='sunny'
  switch(props.weather){
      case 'Clear':
        image=require('./img/sun.png')
        alt='sunny'
        break;
      case 'Clouds':
        image=require('./img/cloudy.png')
        alt='cloudy'
        break;
      case 'Rain':
        image=require('./img/rain.png')
        alt='rainy'
        break;
        case 'Snow':
        image=require('./img/snow.png')
        alt='snowy'
        break;
      default:
        break;

  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='subtitle'>
        {props.hour.split(" ")[1].split(":")[0] + " h"}
        </Typography>
        <CardMedia
          component="img"
          alt={alt}
          className={classes.media}
          height="75"
          image={image}
          title={alt}
        />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.temp+ "°"}
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);