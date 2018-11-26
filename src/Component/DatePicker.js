import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Store from "./Redux/Store";
import { changeDate } from "./Redux/actions";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DatePicker extends React.Component {

    ChangDate = (event)=>{
        Store.dispatch(changeDate(event.target.value))
    }

  render() {
    const { classes } = this.props;
    const chosenDate = Store.getState().date
    
    return (
      <form className={classes.container} noValidate>
        <TextField
          onChange={this.ChangDate.bind(this)}
          id="date"
          label="Date"
          type="date"
          defaultValue={chosenDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePicker);
