import Link from "next/link";
import LOGO from "@/app/LOGO_1.png";
import GameWrapper from "@/components/game/GameWrapper";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="min-h-screen w-full  flex flex-col items-center gap-4 z-10 relative">
        <div className="absolute size-full bg-black/80 z-10" />
        <div className="absolute size-full">
          <img
            className="size-full object-cover object-center"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/BR-en-20250908-TRIFECTA-perspective_39142f82-787b-4486-bf2c-5cd83945001b_large.jpg"
          />
        </div>
        <div className="z-10 w-full p-6 flex justify-between ">
          <h1 className="flex gap-2 items-center title">
            <span>
              <img src="./logo.png" width={20} height={20} alt="logo" />
            </span>
            <span>Chronotune</span>
          </h1>
          <div>
            <Link href="/login">Log in</Link>
          </div>
        </div>
        <div className="h-full m-auto p-4 z-10 flex flex-col text-center items-center gap-4">
          <h2 className="text-3xl font-black">
            Turn music discovery into a game
          </h2>
          <p>
            Put your knowledge of music history to the test. Listen to new
            songs. Have fun
          </p>
          <Link
            href="/game"
            className="bg-green-700 text-white px-5 py-3 rounded-lg mt-5 font-bold"
          >
            Join the Club
          </Link>
        </div>
      </div>
      <div className="min-h-screen bg-black z-20 w-full p-4 flex flex-col gap-10">
        <h3 className="title text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ullam.
        </h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          autem repellat temporibus, tenetur incidunt, sapiente laudantium ut,
          quibusdam tempore ducimus odio cum minus? Dicta, natus itaque. Nam
          ipsam voluptate a.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
          sapiente pariatur non earum sit atque aperiam voluptates aut molestiae
          nostrum, dolores, dicta minus maxime illum quidem corrupti provident
          debitis amet!
        </p>
        <h4 className="title text-2xl mt-20">Lorem ipsum dolor sit amet .</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, minus.
        </p>
        <GameWrapper
          numberOfSongs={1}
          songs={[
            {
              id: "68d36c9668f1d50fdc0833eb",
              artist: "Eric Demarsan",
              audio_url:
                "https://p.scdn.co/mp3-preview/3e36466d322258161d14d0b3e131e91275530d15",
              external_url:
                "https://open.spotify.com/track/4BiRAEQIOf2DRGSVVxxwQw",
              image_url:
                "https://i.scdn.co/image/ab67616d0000b273a303bd18d12c33148fe46d09",
              title: `Thème de Mathilde - Bande originale du film "L'armée des ombres"`,
              year: "2000",
            },
          ]}
        />
      </div>
    </div>
  );
}
