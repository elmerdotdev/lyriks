import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });
  const artist = artistData?.data[0].attributes;

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            src={artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">{artist?.name}</p>

            <p className="text-base text-gray-400 mt-2">
              {artist?.genreNames[0]}
            </p>
          </div>
        </div>

        <div className="w-full sm:h-44 h-24" />
      </div>

      <RelatedSongs
        data={artistData?.data[0]?.views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
