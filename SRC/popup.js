//=============================================================================\\
//                                 popup.js                                     \\
//                             made by nullcheats                                \\
//================================================================================\\

/*
This is our 'event listener' for our 'Button' on the popup.html page
Once the button has been 'clicked' it will then run everything in this event
1 | We create some variables that we will use to edit text fields ect
2 | We will then make a 'FETCH' request to the twitch API for a selected 'channel'
3 | Once we have the response from the request we will then parse the JSON data as you can see below
4 | With the parsed JSON variables we then simply set the text to the selectors
5 | We also create a 'Image' element for the profile picture and set the source to the URL from the response !
*/
document.getElementById("GrabID").addEventListener("click", function() {
    var Channel = document.getElementById("ChannelName").value
    var UIDlbl = document.getElementById("UID");
    var Image = document.getElementById("ImgSource");
    var Usernamelbl = document.getElementById('UserBox');
    var ChannelViewslbl = document.getElementById('ChannelViews');
    var Creationlbl = document.getElementById('CreatedAt');
    if (Channel) {
      fetch('https://api.twitch.tv/helix/users?login=' + Channel, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': ' d4uvtfdr04uq6raoenvj7m86gdk16v'
        },
      }).then(response => response.text()).then((parse) => {
        let JsonData = JSON.parse(parse);
        let UID = JsonData.data[0].id;
        let ProfilePic = JsonData.data[0].profile_image_url;
        let ChannelViews = JsonData.data[0].view_count;
        let Created = JsonData.data[0].created_at.substr(0, 10);
        document.getElementById('Title').style.margin = "10px";
        UIDlbl.innerText = 'ID:' + UID;
        Usernamelbl.innerText = Channel;
        ChannelViewslbl.innerText = 'Views: ' + ChannelViews;
        Creationlbl.innerText = 'Created: ' + Created;
  
        if (Image) {
          Image.remove();
        }
        var img = document.createElement('img');
        img.width = 90;
        img.height = 90;
        img.id = "ImgSource";
        img.src = ProfilePic;
        document.getElementById('ProfilePic').appendChild(img);
      });
    } else {
      UIDlbl.innerText = "N/A";
      if (Image) {
        Image.remove();
      }
    }
  });