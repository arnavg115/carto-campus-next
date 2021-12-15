// import mapboxgl from "mapbox-gl";
import React from "react";

export interface PassWordInputProps {
  password: string;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: string;
}

// export interface CAnchorProps {
//   href: string;
//   label: string;
// }

export interface room {
  name: string;
  building: string;
  rnum: string;
  coord: number[];
}

// export interface MapInputProps {
//   setOrigin: React.Dispatch<React.SetStateAction<string>>;
//   setDest: React.Dispatch<React.SetStateAction<string>>;
//   origin: string;
//   dest: string;
//   suggestionsOr: room[];
//   suggestionDest: room[];
//   setSuggestionDest: React.Dispatch<React.SetStateAction<room[]>>;
//   setSuggestionsOr: React.Dispatch<React.SetStateAction<room[]>>;
//   map: React.MutableRefObject<mapboxgl.Map | null>;
//   directions: React.MutableRefObject<any>;
// }

export interface SideBarTipProps {
  content: string;
  icon: JSX.Element;
  callback: () => void;
}

export interface getUserPrefReturn {
  units: string;
  school: string;
}

export interface NonMapHeaderProps {
  title: string;
}

export interface school {
  _id: number;
  name: string;
  zip: number;
  coord: number[];
}
