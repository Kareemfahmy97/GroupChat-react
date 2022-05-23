import React,{useState} from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./Components";
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();
const apiKey = "grxn4dkw4v6e";

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id: cookies.get("userId"),
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    image: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword"),
    phoneNumber: cookies.get("phoneNumber"),
  }, authToken)
}



const App = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



  if(!authToken) return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
