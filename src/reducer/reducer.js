export const initialState = {
  videos: [],
  watchLater: null,
  likedVideos: null,
  history: null,
  playlist: null,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_VIDEOS":
      return { ...state, videos: payload };

    case "INITIALIZE_WATCH_LATER":
      return { ...state, watchLater: payload };

    case "INITIALIZE_LIKED_VIDEOS":
      return { ...state, likedVideos: payload };

    case "INITIALIZE_HISTORY":
      return { ...state, history: payload };

    case "INITIALIZE_PLAYLISTS":
      if (payload) {
        return { ...state, playlist: payload };
      }
      return state;

    case "TOGGLE_WATCH_LATER":
      const isInWatchLater = state.watchLater?.find(
        (videoId) => videoId === payload
      );
      if (!isInWatchLater) {
        return { ...state, watchLater: [...state.watchLater, payload] };
      }
      console.log(state.watchLater);
      return {
        ...state,
        watchLater: state.watchLater.filter((videoId) => videoId !== payload),
      };

    case "LIKE_UNLIKE":
      const isInLikedVideos = state.likedVideos?.find(
        (videoId) => videoId === payload
      );

      if (!isInLikedVideos) {
        return { ...state, likedVideos: [...state.likedVideos, payload] };
      }
      console.log("in liked...");
      return {
        ...state,
        likedVideos: state.likedVideos.filter((videoId) => videoId !== payload),
      };

    case "CREATE_PLAYLIST":
      console.log(state.playlist);
      console.log(payload.playlistName);
      return {
        ...state,
        playlist: [
          ...state.playlist,
          {
            _id: payload.playlistId,
            name: payload.playlistName,
            videos: [payload.videoId],
          },
        ],
      };

    case "TOGGLE_PLAYLIST_VIDEO":
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem._id === payload.playlistId) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.find(
                (playlistVideo) => playlistVideo === payload.videoId
              )
                ? playlistItem.videos.filter(
                    (playlistVideo) => playlistVideo !== payload.videoId
                  )
                : [...playlistItem.videos, payload.videoId],
            };
          }
          return playlistItem;
        }),
      };

    case "RENAME_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem._id === payload.id) {
            return { ...playlistItem, name: payload.name };
          }
          return playlistItem;
        }),
      };

    case "CLEAR_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem._id === payload) {
            return { ...playlistItem, videos: [] };
          }
          return playlistItem;
        }),
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlistItem) => playlistItem._id !== payload.playlistId
        ),
      };

    case "ADD_TO_HISTORY":
      const isInHistory = state.history?.find(
        (historyVideoId) => historyVideoId === payload
      );

      if (!isInHistory) {
        return { ...state, history: [payload, ...state.history] };
      }
      return {
        ...state,
        history: [payload].concat(
          state.history.filter((historyVideoId) => historyVideoId !== payload)
        ),
      };

    case "REMOVE_FROM_HISTORY":
      const newHistory = state.history.filter(
        (historyVideoId) => historyVideoId !== payload.videoId
      );

      return { ...state, history: newHistory };

    default:
      break;
  }
};
