import Avatar from "react-avatar"
type Props = {
    username: string;
}

function Client({username}: Props) {
  return (
    <div className=" flex gap-2 items-center">
        <Avatar name={username} size="35" round="4px" color="" />
        <span>{username}</span>
    </div>
  )
}

export default Client