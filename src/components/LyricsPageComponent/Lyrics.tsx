import React from "react";
import LyricsInfoTile from "../LyricsInfoTile";

const data = {
  _id: "667d47ef89d69198eef0b282",
  songName: "Kasoor",
  singer: {
    _id: "667d482589d69198eef0b28c",
    name: "Prateek Kuhad",
  },
  albumDetails: {
    _id: "fkasdjlkjjfjaff",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec",
    albumName: "Kasoor Single",
  },
  albumName: "Kasoor single",
  genre: "Pop",
  releaseDate: "2021-01-01T00:00:00.000Z",
};
const Lyrics = () => {
  return (
    <div className="container  h-[90vh] bg-gray-400/10 rounded-md border flex ">
      <div className="w-3/4 ">
        <div className="text-4xl p-2 flex flex-col gap-4 ">
          <div>Haan, main gumsum hoon</div>
          <div>In Rahon ki tarah</div>
          <div>tere Khwabon mein</div>
          <div>Teri khwaishon mein chhupa</div>
          <div>Na jaane kyun</div>
          <div>Hain yeh roz ka silsila</div>
        </div>
      </div>
      <div className="w-1/4 ">
        <div className="rounded-full overflow-clip ">
          <img src={data.albumDetails.albumArt} alt="" />
        </div>
        <div>
          <h1>{data.albumDetails.albumName}</h1>
          <h1>{data.singer.name}</h1>
          <h1>{data.genre}</h1>
          <h1>{new Date(data.releaseDate).toLocaleDateString()}</h1>
        </div>
      </div>
    </div>
  );
};

export default Lyrics;
