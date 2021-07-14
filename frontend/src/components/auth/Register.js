import React from 'react'
import { registerUser } from '../../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const Register = () => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    formData: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleChange = ({ target: { name, value } }) => {
    const newState = { formData: { ...state.formData, [name]: value } }
    console.log('new state', newState)
    setState(newState)
  }

  const isUnregistrable = () => {
    // console.log('This is isRegistrable', !Object.values(state.formData)
    //   .every(val => !!val === true))
    return !Object.values(state.formData)
      .every(val => !!val === true)
  }

  const isUnequal = (data) => {
    // console.log(!(data.password === data.passwordConfirmation))
    return !(data.password === data.passwordConfirmation)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(state.formData)
      // TODO find react hooks equivalent of line below:
      // this.props.history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ width: '100%', height: '90vh' }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Register
            </Typography>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              style={{ display: 'flex', flexDirection: 'column' }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                name="firstName"
                label="First Name"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                name="lastName"
                label="Last Name"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                type="email"
                name="email"
                label="Email"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                type="password"
                name="password"
                label="Password"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                type="password"
                name="passwordConfirmation"
                label="Confirm Password"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={ isUnregistrable() || isUnequal(state.formData) }
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Register
