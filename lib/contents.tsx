import { CardsProps } from "../components/Cards";
import {
  Deploy,
  FormLock,
  Trigger,
  Help,
  Group,
  Target,
  Home,
  SettingsOption,
} from "grommet-icons";
import { SideBarTipProps } from "../components/SideBarTip";
import { NextRouter } from "next/router";

export const HomeCards: CardsProps[] = [
  {
    title: "Fast",
    description: `Through the use of many well-known external softwares, our product
          has incredible response rates. Navigation occurs almost instantly
          after the request, and signing up can be completed in less than a
          minute.`,
    icon: <Deploy size="45px" color="red" />,
  },
  {
    title: "Safe",
    description: `We are currently using Firebase to store information and deploying
        our product on Vercel. Firebase provides our application with
        secure authentication of users, a database, and Vercel provides
        safe hosting for our web app`,
    icon: <FormLock size="45px" color="red" />,
  },
  {
    title: "Reliable",
    description: ` We use many well-known external technologies to help with the
        deployment and production build of our website, such as Vercel,
        Firebase, and Mapbox. These systems allow for quicker response and
        seamless navigation.`,
    icon: <Trigger size="45px" color="red" />,
  },
];

export const AboutCards: CardsProps[] = [
  {
    title: "Who We Are",
    description: `Carto-Campus is an interactive application that provides students
  and teachers a platform to navigate from class to class without
  any difficulties. With schools getting larger and larger,
  traversing through school campuses has become harder than ever
  before. Our goal is to develop technologies and applications for
  various platforms to provide easy and accesible navigation to
  students and other visitors.`,
    icon: <Help size="45px" color="red" />,
  },
  {
    title: "Involvement",
    description: `Through our project students will be able to find the most optimal
    navigation from place to place on campus. Additionally, our
    project will help students find clubs and other extracurricular
    activities. Moreover, we hope to expand our project, and along
    with that, our team as well. Students may join our programming
    team and help us build our technology, giving students valuable
    experience in a growing field.`,
    icon: <Group size="45px" color="red" />,
  },
  {
    title: "Vision",
    description: `With Carto-Campus, we hope to create a community where students
    are able to navigate their schools with ease, and hopefully
    develop their interests through the discovery of clubs and other
    extracurricular activities. Additionally, we would like to include
    many students in our project to provide them with experience in
    programming and cartography, inspiring them to create projects of
    their own.`,
    icon: <Target size="45px" color="red" />,
  },
];

export const authSideBar: SideBarTipProps[] = [
  {
    content: "Home",
    icon: <Home />,
    callback: (router: NextRouter) => {
      router.push("/");
    },
  },
  {
    content: "Settings",
    icon: <SettingsOption />,
    callback: (router: NextRouter) => {
      router.push("/settings");
    },
  },
];
