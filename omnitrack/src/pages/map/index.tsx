import Head from "next/head";
import NavBar from "@/components/navBar";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/loginForm";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Home = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>OmniTrack</title>
          <meta name="description" content="track devices and manage them" />
          <link rel="icon" href="/inbox_tray/favicon.ico" />
        </Head>
        <div className="flex min-h-screen w-full flex-col">
          <LoginForm />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>OmniTrack</title>
        <meta name="description" content="track devices and manage them" />
        <link rel="icon" href="/inbox_tray/favicon.ico" />
      </Head>
      <div className="flex min-h-screen w-full flex-col">
        <NavBar />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <Map
            initialViewState={{
              latitude: 37.8,
              longitude: -122.4,
              zoom: 9,
            }}
            style={{ width: 800, height: 600 }}
            mapboxAccessToken={
              "pk.eyJ1IjoibWFobW91ZGVzc2UiLCJhIjoiY2x2dmcybHBoMWVnajJqbndoOHpsb2F0aiJ9.8mivemx3LMvrunxfrun7ug"
            }
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
          >
            <Marker longitude={-122.4} latitude={37.8} color="red" />
          </Map>
        </main>
      </div>
    </>
  );
};

export default Home;
