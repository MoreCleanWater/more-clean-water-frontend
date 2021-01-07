import { TextField } from '@material-ui/core';
import './ProfileDetails.css';
  

function ProfileDetails(props) {
  const ProfileDetailsStyle = {
    height: '52px',
    width: '100%',
    margin: '20px 0',
    padding: '0px'
  };
  return (
    <div>
      { (props.userType === "name" || props.userType === "email") && <TextField autoComplete="on" style={ProfileDetailsStyle} required id={props.userType} label={props.userType} /> }
      { (props.userType === "password" || props.userType === "confirm password") && <TextField type="password" autoComplete="current-password" style={ProfileDetailsStyle} required id={props.userType} label={props.userType} />}
    </div>
  );
}

export default ProfileDetails;
