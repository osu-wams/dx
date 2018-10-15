/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    // marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button}>
        Delete
        <DeleteIcon className="rightIcon" />
      </Button>
      <Button variant="contained" color="secondary" className={(classes.button, 'bgStratosphere')}>
        Send
        <SendIcon className={classes.rightIcon}>send</SendIcon>
      </Button>
      <Button variant="contained" color="secondary" className={(classes.button, 'bgPineStand')}>
        Upload
        <CloudUploadIcon className="rightIcon" />
      </Button>
      <Button variant="contained" disabled color="secondary" className={classes.button}>
        <KeyboardVoiceICon className={classes.leftIcon} />
        Talk
      </Button>
      <Button variant="contained" size="small" className={classes.button}>
        <SaveIcon className={classNames('leftIcon', classes.iconSmall)} />
        Save
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
