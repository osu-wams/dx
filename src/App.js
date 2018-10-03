import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import WorkIcon from '@material-ui/icons/WorkOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutline';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { withStyles, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import osuTheme from './theme/osuTheme';
import CardHeader from './theme/CardHeader';
// import ClassNames from 'docs/src/pages/customization/overrides/ClassNames';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: 'relative',
    color: '#fff'
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  benny: {
    backgroundColor: '#555',
    color: '#fff',
    width: '70%',
    padding: '14px',
    margin: '14px 0'
  },
  me: {
    backgroundColor: '#f2f2f2',
    width: '70%',
    padding: '14px',
    margin: '10px 0',
    marginLeft: '30%'
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2
    },
  },
  avatar: {
    backgroundColor: osuTheme.palette.primary.main
  },
  footer: {
    marginTop: '10px',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `20px`,
    backgroundColor: '#252525',
    color: '#fff'
  }
});

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App(props) {
  const { classes } = props;

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={osuTheme}>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="static" color="primary" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
                Oregon State University
              </Typography>
              <Button color="secondary" active>Dashboard</Button>
              <Button color="secondary">Academics</Button>
              <Button color="secondary">Finances</Button>
              <Button color="secondary">Tools</Button>
              <Button color="secondary">Events</Button>
              <Button color="secondary" variant="outlined">
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <div className="grid-container">
            <div className="Academics">
              <Card>
                <CardHeader
                  color="stratosphere"
                  title="Upcoming Assignments"
                  action={<AssignmentIcon />}
                />
                <CardContent>
                  <List component="nav" dense>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="10/31 - Math 101: exam" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="10/31 - Math 201: Homework due" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="11/01 - ENG 111: paper due" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="11/01 - Math 101: homework" secondary="An example with further description..." />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="11/01 - Math 101: Assignment" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="11/02 - ENG 111: final" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText
                        primary="11/03 - Math 201"
                        secondary="An example with further description on this tool or service"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
            <div className="Events">
              <Card>
                <CardHeader
                  title="Events"
                  action={<EventIcon />}
                  color="black"
                />
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <Card>
                        <CardHeader
                          title="21"
                          avatar={
                            <Avatar aria-label="October" className={classes.avatar}>
                              Sep
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography color="textPrimary">
                              AMC Movie Night - Welcome Week Special
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardHeader
                          title="22"
                          avatar={
                            <Avatar aria-label="October" className={classes.avatar}>
                              Sep
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography color="textPrimary">
                              Corvallis Fall Festival
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardHeader
                          title="22"
                          avatar={
                            <Avatar aria-label="October" className={classes.avatar}>
                              Sep
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography color="textPrimary">
                              OSUsed Store Sale
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardHeader
                          title="22"
                          className={classes.cardHeader}
                          avatar={
                            <Avatar aria-label="October" className={classes.avatar}>
                              Sep
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography color="textPrimary">
                              Beaver Football v. Arizona
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
            <div className="Tools">
              <Card>
                <CardHeader
                  title="Tools and Services"
                  action={<WorkIcon />}
                  color="charcoal"
                />
                <CardContent>
                  <List component="nav" dense>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Canvas" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Box" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Email" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Calendar" secondary="An example with further description..." />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Banner" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Campus Map" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText
                        primary="Timesheet"
                        secondary="An example with further description on this tool or service"
                      />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Course Catalog" />
                    </ListItem>
                    <ListItem divider button component="a" href="#testo">
                      <ListItemText primary="Libraries" />
                    </ListItem>
                    <ListItem button component="a" href="#testo">
                      <ListItemText primary="Google Suite" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </div>
            <div className="BennyBot">
              <Card>
                <CardHeader
                  title="BennyBot"
                  color="orange"
                />
                <CardContent>
                  <Paper className={classes.me}>
                    My question
                  </Paper>
                  <Paper className={classes.benny}>
                    Benny response
                  </Paper>
                  <Paper className={classes.me}>
                    When can I buy a parking permit?
                  </Paper>
                  <Paper className={classes.benny}>
                    Permit sales begin September 5, 2018 for new annual permit holders.
                    Permits will be available for pick up or will be mailed on September 5.
                  </Paper>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BennyBot can answer many questions
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <ChatBubbleIcon color="primary" />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </CardContent>
            </Card>
            </div>
            <div className="DidYouKnow">
              <Card>
                <CardHeader
                  title="Did You Know..."
                  action={<StarIcon />}
                />
                <CardContent>
                  <p>As a student you can get a free copy of Microsoft Office 365!</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <footer className={classNames(classes.footer)}>
            <p>Copyright</p>
            <p>Privacy Policy</p>
            <p>Accessibility statement</p>
          </footer>
        </React.Fragment>
      </MuiThemeProvider>
    </JssProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
