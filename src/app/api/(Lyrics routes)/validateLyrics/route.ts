import LyricsModel from "@/models/LyricsModel";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const songName = searchParams.get("songNameToValidate");
  console.log(songName)

  const lyricsFound = await LyricsModel.findOne({songName:songName})
  // console.log(lyricsFound)

  if(!lyricsFound){
    return  Response.json({ message: "Lyrics Not Found", success:false, } ,{status: 404 })
  }

  return  Response.json({ message: "Lyrics Found", success:true ,data:{lyricsId:lyricsFound._id}} ,{status: 200 })

}
