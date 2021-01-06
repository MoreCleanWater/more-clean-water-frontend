import BottomMenu from "./BottomMenu/BottomMenu";
import SideMenu from "./SideMenu/SideMenu";
import TopMenu from "./TopMenu/TopMenu";
import BottomMenuItem from "./BottomMenu/BottomMenuItem/BottomMenuItem";

function Nav() {
    return (
        <div>
            <TopMenu/>
            <SideMenu/>
            <BottomMenu>
                <BottomMenuItem icon="info" title="Water Awareness" to="/water-awareness"/>
                <BottomMenuItem icon="room" title="Find Water" to="/"/>
                <BottomMenuItem icon="notifications" title="Updates" to="/updates"/>
            </BottomMenu>
        </div>
    )
}

export default Nav;