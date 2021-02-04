import './BottomMenu.scss';

function BottomMenu({children}) {
  return (
    <nav>
      <div className="bottom-bar">
          <ul className="bottom-menu">
            {children}
          </ul>
      </div>
    </nav>
  );
}

export default BottomMenu;