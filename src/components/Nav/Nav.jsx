import BottomMenu from "./BottomMenu/BottomMenu";
import TopMenu from "./TopMenu/TopMenu";
import BottomMenuItem from "./BottomMenu/BottomMenuItem/BottomMenuItem";
import InfoIcon from '@material-ui/icons/Info';
import RoomIcon from '@material-ui/icons/Room';
import NotificationsIcon from '@material-ui/icons/Notifications';

function Nav() {
    return (
        <div>
            <TopMenu/>
            <BottomMenu>
                <BottomMenuItem icon={<InfoIcon/>} title="Awareness" to="/awareness"/>
                <BottomMenuItem icon={<RoomIcon/>} title="Find Water" to="/find-water"/>
                <BottomMenuItem icon={<NotificationsIcon/>} title="Alerts" to="/alerts"/>
            </BottomMenu>
        </div>
    )
}

export default Nav;