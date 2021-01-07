import './UpdatesItem.css';

function UpdatesItem({id, title, description, markAsRead}) {
  
  const handleClick = () => markAsRead(id);

  return (
    <li className="update-item" onClick={handleClick}>
        <h2 className="update__title">
            {title}
        </h2>

        <p className="update__description">
            {description}
        </p>
    </li>
  )
}

export default UpdatesItem;
